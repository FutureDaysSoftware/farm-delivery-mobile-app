import React from 'react';
import {useNavigation} from '@react-navigation/native';

// Native Base Componens
import {Button, Text, Footer, FooterTab} from 'native-base';

const FooterBar = () => {
  const navigation = useNavigation();
  return (
    <Footer>
      <FooterTab>
        <Button onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </Button>
        <Button active onPress={() => navigation.navigate('Map')}>
          <Text>Map</Text>
        </Button>
        <Button onPress={() => navigation.navigate('List')}>
          <Text>List</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterBar;
