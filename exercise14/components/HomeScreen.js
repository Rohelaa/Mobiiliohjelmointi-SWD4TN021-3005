import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('locationdb.db')

export default function HomeScreen ({ navigation }) {
  const [address, setAddress] = useState('')
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists location (id integer primary key not null, address text);'
      )
    }, null, updateList)
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      // console.log(tx)
      tx.executeSql(
        'insert into location (address) values (?);', 
        [address]
      ) 
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from location;', [], (_, { rows }) => {
        console.log(rows)
        setAddresses(rows._array)
        console.log(addresses);
        
      })
    })
  }

  return (
    <View style={styles.container}>
      <Input 
        onChangeText={input => setAddress(input)}
        label='Placefinder'
        placeholder='Type in address'
        value={address}
      />
      <Button 
        onPress={saveItem}
        buttonStyle={{
          marginTop: 10
        }}
        title='SAVE'
        icon={
          <Icon 
            name='save'
            color='white'
            iconStyle={{
              marginRight: 5
            }}
          />
        }
      />
      <View style={{ flex: 2 }}>
        <FlatList 
          data={addresses}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Button 
              title={item.address}
              onPress={() => navigation.navigate('Map', {
                address: item.address
              })}
            />
          )}
        />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});