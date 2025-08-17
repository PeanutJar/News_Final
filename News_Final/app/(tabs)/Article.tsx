import React from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Linking  } from 'react-native';


const Article = (props: { article: { image_url: any; title: any; description: any; pubDate: any; link: any; }; }) => {
   //Destructure the article fields
  const { image_url, title, description, pubDate, link } = props.article;

  return (
    <SafeAreaView style={styles.container}>
    {/*whole article section will be a button that sends the user to the actual article*/}
      <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.touch}>

        {/*article image*/}
        {image_url ? (
          <Image source={{ uri: image_url }} style={styles.image} />
        ) : null}

        {/*article title*/}
        <Text style={styles.title}>{title}</Text>

        {/*article description*/}
        <Text style={styles.description}>{description}</Text>

        {/*article date*/}
        <Text style={styles.date}>{pubDate}</Text>

      </TouchableOpacity>

    </SafeAreaView>
  );
}

export default Article;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    marginTop: 30,
    width: "90%",
    borderRadius: 10,
    elevation: 3,
  },
  touch: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

});
