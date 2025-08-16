import { Text, SafeAreaView, StyleSheet, View, TextInput} from 'react-native';

export default App;

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position:'absolute',top:0,backgroundColor: '#80B1DE', width:'110%',height:'4%'}}></View>
      <View style={styles.headerbox}> //news header
        <Text style={styles.headertext}> NEWS </Text>
      </View>
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
    //height: '10%',
    //padding: 5,
    //position: 'absolute',
    //top: 0,
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

});