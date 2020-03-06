import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Image, Text } from 'react-native';

function Recipe({ title, thumbnail }) {
  return (
    <View>
      <Text>{title}</Text>
      <Image 
        source={{ uri: thumbnail }} 
        style={{
          width: 50, 
          height: 50,
          marginBottom: 5
        }}
      />
    </View>
  )
}

export default function App() {
  const [desc, setDesc] = useState('')
  const [recipes, setRecipes] = useState([])


  // listan sisällön erottelemiseksi
  const listSeparator = () => {
    return (
      <View 
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#b7b7b7'
        }}
      />
    )
  }

  const getRecipes = () => {
    fetch(`http://www.recipepuppy.com/api/?i=${desc}`)
      .then(response => response.json())
      .then(formattedResponse => setRecipes(formattedResponse.results))
      .catch(error => {
        console.log(error.message)
      })

      console.log(recipes)
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setDesc(text)}
          value={desc} 
        />
        <Button 
          title="Search"
          onPress={getRecipes}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={recipes}
        renderItem={({ item }) => 
          <Recipe 
            title={item.title}
            thumbnail={item.thumbnail}
          />
        }
        ItemSeparatorComponent={listSeparator}
        keyExtractor={item => item.title}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={text => setDesc(text)}
        value={desc} 
      />
      <Button 
        title="Search"
        onPress={getRecipes}
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
    borderColor: 'grey',
    borderWidth: 1,
    width: 100
  }
});
