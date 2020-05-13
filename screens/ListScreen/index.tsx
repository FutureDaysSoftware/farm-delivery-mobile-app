import React, {useState} from 'react';
import deliveryAddresses from '../../addresses';

import {Button, Alert, Linking} from 'react-native';

// Native Base Componens
import {Content, ListItem, Text, Separator} from 'native-base';

interface Delivery {
  id: number;
  lat: number;
  lon: number;
  address: string;
  completed: boolean;
}

const initialCompletedDelivery: Delivery = {
  id: 9,
  lat: 37.78825,
  lon: -122.4085,
  address: '4487 Terry St, San Francisco, CA 94108',
  completed: true,
};

const ListScreen = ({navigation}: any) => {
  const [addresses, setAddresses] = useState(deliveryAddresses);
  const [completedDeliveries, setCompletedDeliveries] = useState([
    initialCompletedDelivery,
  ]);

  const renderDeliveryListItem = (address: any) => (
    <ListItem
      key={`${address.lon}-${address.id}`}
      style={{justifyContent: 'space-between'}}
      onPress={() =>
        Linking.openURL(
          `maps://app?saddr=100+101&daddr=${address.lat}+${address.lon}`,
        )
      }>
      <Text>{address.address}</Text>
      <Button title="Done" onPress={() => handleDonePress(address.id)} />
    </ListItem>
  );

  const renderCompletedDeliveryListItem = (address: any) => (
    <ListItem
      key={`${address.lon}-${address.id}`}
      style={{justifyContent: 'space-between'}}>
      <Text>{address.address}</Text>
      <Button title="Undo" onPress={() => undoPressAlert(address.id)} />
    </ListItem>
  );

  const handleDonePress = (id: number) => {
    const unCompletedDeliveries = addresses.filter(
      (address) => address.id !== id,
    );
    const indexOfCompletedDelivey = addresses.findIndex(
      (item) => item.id === id,
    );
    const completedDelivery = addresses[indexOfCompletedDelivey];
    setAddresses(unCompletedDeliveries);
    setCompletedDeliveries([...completedDeliveries, completedDelivery]);
    console.log([...completedDeliveries, completedDelivery]);
  };

  const handleUndoPress = (id: number) => {
    console.log('undoing...');
    const newCompletedDeliveries = completedDeliveries.filter(
      (address) => address.id !== id,
    );
    const indexOfUndo = completedDeliveries.findIndex((item) => item.id === id);
    console.log(indexOfUndo);
    const newUncompletedDelivery = completedDeliveries[indexOfUndo];
    setCompletedDeliveries(newCompletedDeliveries);
    console.log(newUncompletedDelivery);
    setAddresses([...addresses, newUncompletedDelivery]);
    console.log('============================================');
    console.log([...addresses, newUncompletedDelivery]);
    console.log('============================================');
  };

  const undoPressAlert = (id: any) => {
    console.log({alertId: id});
    return Alert.alert(
      'MARK UNCOMPLETE',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleUndoPress(id)},
      ],
      {cancelable: false},
    );
  };

  return (
    <Content>
      <Separator bordered>
        <Text>Need to be delivered</Text>
      </Separator>
      {addresses && addresses.length > 0 ? (
        addresses.map((address) => renderDeliveryListItem(address))
      ) : (
        <ListItem>
          <Text>All Deliveries completed</Text>
        </ListItem>
      )}
      <Separator bordered>
        <Text>Completed Deliveries</Text>
      </Separator>
      {completedDeliveries && completedDeliveries.length > 0 ? (
        completedDeliveries.map((address) =>
          renderCompletedDeliveryListItem(address),
        )
      ) : (
        <ListItem>
          <Text>No Completed Deliveries</Text>
        </ListItem>
      )}
    </Content>
  );
};

export default ListScreen;
