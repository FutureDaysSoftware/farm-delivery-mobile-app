import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, Image, Platform, Alert, Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import deliveryAddresses from '../../addresses';

// Google Maps
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import getDirections from 'react-native-google-maps-directions';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    height: 50,
    width: 50,
  },
});

const MapScreen = ({navigation}: any) => {
  const [initialPosition, setInitialPosition] = useState();
  const mapRef = useRef(null);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(JSON.stringify(position));
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.059,
          longitudeDelta: 0.0315,
        };
        setInitialPosition(region);
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  const requestLocation = async () => {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone ' + response);
      if (response === 'granted') {
        getCurrentPosition();
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android ' + response);
      if (response === 'granted') {
        getCurrentPosition();
      }
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const renderMapMarker = (lat: number, lon: number, address: string) => {
    return (
      <Marker
        key={`${lat}-${lon}`}
        coordinate={{latitude: lat, longitude: lon}}
        title="My first marker">
        <Callout>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`maps://app?saddr=100+101&daddr=${lat}+${lon}`)
            }>
            <Text>{address}</Text>
          </TouchableOpacity>
        </Callout>
        {/* <Image source={require('../../chicken.png')} style={styles.icon} /> */}
      </Marker>
    );
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      showsUserLocation={true}
      ref={mapRef}
      style={styles.map}
      initialRegion={initialPosition}>
      {deliveryAddresses.map((marker) =>
        renderMapMarker(marker.lat, marker.lon, marker.address),
      )}
    </MapView>
  );
};

export default MapScreen;
