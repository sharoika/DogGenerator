import React, { useState } from 'react';
import {
  Image,
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

AppRegistry.registerComponent('RNBootSplash', () => App);
RNBootSplash.hide();

  function App(): JSX.Element {
    const [dogImage, setDogImage] = useState();
    const [dogCounter, setDogCounter] = useState(0);

    const getDogFromApi = async () => {
      return fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => 
          response.json()
        )
        .then(json => {
          setDogImage(json.message);
          setDogCounter(dogCounter + 1);
        })
        .catch(error => {
          console.error(error.status);
        });
    };

    return (
      <View style={styles.container}>
        <View style={styles.headerTop}>
            <Text style={styles.headerText}> Dog Generator </Text>
            <Text style={styles.normalText}> By; Maksim Sharoika </Text>
        </View>
        <View style={styles.bodyMiddle}>
          {
            dogImage 
            ?
            <Image style={styles.image} source={{uri: dogImage}} />
            :
            <Image style={styles.image} source={require('./src/images/rosa.png')} />
          }
        </View>
        <View style={styles.footerBottom}>
        <Text style={styles.counterText}> Dog Count : {dogCounter} </Text>
          <View style={styles.imageContainer}>
          <Button
            title="Generate Doggo"
            color="#FFFFFF"
            onPress={() => getDogFromApi()}
          />
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 4,
      flexDirection: 'column',
      backgroundColor: Colors.lighter,
      paddingTop: 50,
      paddingBottom: 50,
    },
    headerTop: {
      justifyContent: 'center',
      flex: 1,
    },
    bodyMiddle: {
      justifyContent: 'center',
      flex: 7,
    },
    footerBottom: {
      justifyContent: 'center',
      flex: 1,
    },
    image: {
      alignSelf: 'center',
      backgroundColor: Colors.lighter,
      height: 500,
      width: 300,
      borderRadius: 50,
      borderColor: Colors.black,
      borderWidth: 5,
      resizeMode: 'cover',
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.black,
      borderRadius: 50,
      marginTop: 10,
      marginBotton: 30,
      marginLeft: 100,
      marginRight: 100,
    },
    headerText: {
      alignSelf: 'center', 
      fontSize: 24,
      paddingTop: 10,
    },
    counterText: {
      alignSelf: 'center', 
      fontSize: 20,
      paddingTop: 4,
    },
    normalText: {
      alignSelf: 'center', 
      fontSize: 12,
      paddingTop: 6,
    },
  });
  
  export default App;