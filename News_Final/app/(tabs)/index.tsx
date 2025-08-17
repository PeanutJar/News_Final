import { Text, SafeAreaView, StyleSheet, View, ScrollView, FlatList, ActivityIndicator, TextInput, RefreshControl } from 'react-native';

import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import filter from "lodash.filter";

import Article from "./Article";

export default App;


const DATA = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Date' },
  { id: '5', name: 'Elderberry' },
];

function App() {
  const [loading, setLoading] = useState(true); //usestate for loading page
  const [anim, setAnimation] = useState(true); //usestate for animation
    const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);


  //renders after first instance of 
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(DATA);
    } else {
      const newData = DATA.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(newData);
    }
  }, [searchQuery]);


  return (
    <SafeAreaView style={styles.container}>

      //plays loading anmation untl fully rendered
      //whille both loading and anim are not true
      {(anim) ? ( //ok for SOME odd reason when doing the this await variable thing "&&" and "||" have swapped roles. "&&" being 'or' and
      //"||" being 'and'.
        <LottieView style={{width:300, height:300}}
        source={require("../../assets/News.json")}
        autoPlay
        loop={false}
        resizeMode='cover'
        onAnimationFinish={() => setAnimation(false)}
        />
      ) : (
        <>
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            style={styles.searchBar}
          />

          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
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
    searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginTop: 50,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
  },

});
