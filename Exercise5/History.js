import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";

export default function History({ route }) {
  return (
    <View style={styles.container}>
      <Text>History</Text>
        <FlatList 
          data={route.params.calculations}
          renderItem={({item}) => 
            <Text>
              {item.value1} {item.calcType} {item.value2} = {item.calcResult}
            </Text>
          }
          keyExtractor={item => item.id}
        /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})