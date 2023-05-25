import React, { useState } from 'react';
import { Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import RNBootSplash from 'react-native-bootsplash';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// this is registering the splash screen on boot
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
            <Image style={styles.image} source={{ uri: dogImage }} />
            :
            <Image style={styles.image} source={require('./src/images/rosa.png')} />
        }
      </View>

      <View style={styles.footerBottom}>
        <View style={styles.buttonsContainer}>
          <Button
            title="Generate Doggo"
            titleStyle={{ color: 'white' }}
            buttonStyle={{
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderRadius: 5,
            }}
            onPress={() => getDogFromApi()}
          
          />
          </View>
        <Text style={styles.counterText}> Dog Count : {dogCounter} </Text>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.lighter,
    paddingTop: '10%',
    paddingBottom: '10%',
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
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    backgroundColor: Colors.lighter,
    height: '90%',
    width: '80%',
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
    marginLeft: '30%',
    marginRight: '30%',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 24,
    paddingTop: '2%',
  },
  normalText: {
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: '2%'
  },
  counterText: {
    alignSelf: 'center',
    fontSize: 20,
    paddingTop: '4%',
  }
});

export default App;