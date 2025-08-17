import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList, ActivityIndicator, TextInput, RefreshControl } from 'react-native';

import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import filter from "lodash.filter";

import Article from "./Article";

interface ARTICLE {
  title?: string;
  description?: string;
  pubDate?: string;
}

export default App;

function App() {
  const [articles, setArticles] = useState([]); //usestate for news articles
  const [loading, setLoading] = useState(true); //usestate for loading page
  const [anim, setAnimation] = useState(true); //usestate for animation
  const [search, setSearch] = useState("");  //usestate for search query
  const [fulldata, setFullData] = useState([]); //usestate for transfer of new preview of data
  const [refreshing, setRefreshing] = useState(false); //usestate for refreshing/updating article list


//this is utilizing fetch (opposed to using Axios)
  const GetNews = async () => {
    //the current api being used is Newsdata.io's free api. If the current api url dodes not work simply replace the url with a new api key/link from Newsdata.io
    const apiKey = "pub_9c0dbf1e4af74b1eb00da71e4e2c5901";
    const apiURL = "https://newsdata.io/api/1/latest?apikey=" + apiKey + "&country=wo&language=en&image=1";
    
    //setLoading(true);
    try {
      const response = await fetch(apiURL); //fetches json file
      const json = await response.json(); //makes it readable to program (basicaly stringifies it)
      console.log(json); // Add this
      setArticles(json.results); //whatever data we get
      console.log(json.results);
      setFullData(json.results)
    }
    catch(error) { //if error
      console.error(error);
    }
    finally { //completes function
        setLoading(false);
    }
    
  };

  //renders after first instance of 
  useEffect(() => {
    GetNews();
  },[])

  //enables refresshing, rerenders new data, then disbales refreshing
  const onRefresh = async () => {
  setRefreshing(true);
  await GetNews();     
  setRefreshing(false);
};

  //collects data relavent to search query
  const handleSearch = (query : string) => {
    setSearch(query);
    const formattedQuery = query.toLowerCase();
    const filtereddata = filter(fulldata, (item) => {
      return(contains(item, formattedQuery));
    });
    setArticles(filtereddata);
  }
  //passes relavent date from query for articles' titles, descriptions, and publish dates, then passes back those articles that matches
  const contains = (item: ARTICLE, query : string) => {
    const { title, description, pubDate } = item;
    const lowerTitle = title ? title.toLowerCase() : "";
    const lowerDescription = description ? description.toLowerCase() : "";
    const lowerPubDate = pubDate ? pubDate.toLowerCase() : "";
    //const {title, description, pubDate}
    if(lowerTitle.includes(query) || lowerDescription.includes(query) || lowerPubDate.includes(query)) {
      return true;
    }
    return false;
  }

  return (
    <SafeAreaView style={styles.container}>

      {/*plays loading anmation untl fully rendered
      while both loading and anim are not true*/}
      {(loading || anim) ? ( //ok for SOME odd reason when doing the this await variable thing "&&" and "||" have swapped roles. "&&" being 'or' and
      //"||" being 'and'.
        <LottieView style={{width:300, height:300}}
        source={require("../../assets/News.json")}
        autoPlay
        loop={false}
        resizeMode='cover'
        onAnimationFinish={() => setAnimation(false)}
        />
      ) : (
        //allows for multiple objects to be entered
        <> 
        <View style={{position:'absolute',top:0,backgroundColor: '#80B1DE', width:'110%',height:'4%'}}></View>
        <View style={styles.headerbox}> {/*news header*/}
          <Text style={styles.headertext}> NEWS </Text>
        </View>

        <TextInput style={styles.stylebox} placeholder='Search' clearButtonMode='always'
          autoCorrect={false}
          autoCapitalize="none"
          value={search}
          onChangeText={(query) => handleSearch(query)}
        />

        <FlatList //list of news articles
          data={articles}
          renderItem={({ item }) => <Article article={item} />}
          keyExtractor={(item, index) => index.toString()} //extracts article by title basis
          style={{flex:.82}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    padding: 8,
  },
  headerbox: {
    width: '110%',
    backgroundColor: '#80B1DE',
    alignItems: 'center',
    justifyContent: 'center',
    flex:0.15
  },
  headertext: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
  },
  stylebox: {
    borderColor:'#CFCFCF',
    borderWidth:1.5,
    borderRadius:1,
    flex: 0.03,
    justifyContent:'center',
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
  }

});
