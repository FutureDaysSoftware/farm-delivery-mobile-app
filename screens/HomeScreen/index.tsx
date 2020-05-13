import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

// Native Base Componens
import {Button, Text} from 'native-base';

//components
import FooterBar from '../../components/FooterBar';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image source={require('../../chicken.png')} />
        <Text style={styles.header}>Welcome to your delivery manager</Text>
      </View>
      <View style={styles.buttonSection}>
        <View>
          <Button
            onPress={() => navigation.navigate('Map')}
            style={styles.button}>
            <Text>View Deliveries on map</Text>
          </Button>
          <View style={{marginHorizontal: 5, padding: 5}} />
          <Button
            onPress={() => navigation.navigate('List')}
            style={styles.button}>
            <Text>View Deliveries in a list</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: '#C39541',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
  },
  hero: {
    height: 400,
    paddingVertical: 50,
    alignItems: 'center',
  },
  buttonSection: {
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
