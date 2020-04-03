import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import * as SQLite from "expo-sqlite";
import { Input, Button, Header } from 'react-native-elements';

const db = SQLite.openDatabase('grocerydb.db')

export default function App() {
  // const [grocery, setGrocery] = useState('')
  const [groceries, setGroceries] = useState([])
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists grocery (id integer primary key not null, product text, amount text);')
    }, null, updateList)
  }, [])

  // const addToList = () => {
  //   setGroceries([...groceries, grocery])
  //   setGrocery('')
  // }

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into grocery (product, amount) values (?,?);',
        [product, amount])
    }, null, updateList)
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from grocery where id = ?;', [id])
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from grocery;', [], (_, { rows }) => {
        setGroceries(rows._array)
        console.log(rows)
      })
    })
  }

  return (
    <View style={styles.container}>
      <Header 
        centerComponent={
          { 
            text: 'Shopping List', 
            style: { 
              color: '#fff',
              fontSize: 20
            }
          }
        }
      />
      <Input
        containerStyle={{ marginTop: 30 }} 
        placeholder='Product'
        onChangeText={input => setProduct(input)}
        value={product}
      />
      <Input 
        placeholder='Amount'
        onChangeText={input => setAmount(input)}
        value={amount}
      />
      <View style={styles.buttons}>
        <Button 
          title='add'
          onPress={saveItem}
          buttonStyle={{ marginTop: 10 }}
        />
      </View>
      <FlatList 
        keyExtractor={item => item.id.toString()}
        data={groceries}
        renderItem={({item}) => 
          <View style={{ flexDirection: "row"}}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={{ color: '#ff0000'}} onPress={() => deleteItem(item.id)}> bought</Text>
          </View>
        }
      />
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
  buttons: {
    flexDirection: 'row'
  },
});