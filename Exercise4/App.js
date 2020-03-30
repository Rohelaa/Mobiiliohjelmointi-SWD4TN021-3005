import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [grocery, setGrocery] = useState('')
  const [groceries, setGroceries] = useState([])

  const addToList = () => {
    setGroceries([...groceries, grocery])
    setGrocery('')
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput}
        onChangeText={input => setGrocery(input)} 
        value={grocery}
      />
      <View style={styles.buttons}>
        <Button 
          title='add'
          onPress={addToList}
        />
        <Button 
          title='clear'
          onPress={() => setGroceries([])}
         />
      </View>
      <Text style={styles.shoppingList}>Shopping list</Text>
      <FlatList 
        data={groceries}
        renderItem={({item}) => 
          <Text>{item}</Text>}
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
  textInput: {
    marginTop: 50,
    width: 200,
    borderWidth: 1,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row'
  },
  shoppingList: {
    color: 'green',
    fontWeight: 'bold'
  }
});
