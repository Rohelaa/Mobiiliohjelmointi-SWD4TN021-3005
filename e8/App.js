import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button } from 'react-native';

export default function App() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [currencyRates, setCurrencyRates] = useState({})


  const getCurrencyRates = () => {
    fetch('http://data.fixer.io/api/latest?access_key=479bbd71091ff73524097f19487ced1f&format=1')
    .then(response => response.json())
    .then(resData => {
      console.log(resData.rates)
      setCurrencyRates(resData.rates)
    })
    .then(response => console.log(Object.keys(currencyRates)))
    .catch(error => {
      console.error(error.message)
    })
  }

  useEffect(() => {
    getCurrencyRates()
  }, [])
  

  const pickerItemsInArray = Object.keys(currencyRates).map(currencyCode => {
    <Picker.Item label={currencyCode} value={currencyCode} />
  })

  const pickerItems = pickerItemsInArray.forEach
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.TextInput} 
        onChangeText={amount => setAmount(amount)}
      />
      <Picker
        selectedValue={currency}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) => {
          setCurrency(itemValue)
        }}
      >
        
        <Picker.Item label="GBP" value="GBP" />
        <Picker.Item label="AED" value="AED" />
      </Picker>
      <Button
        title="convert" 
        onPress={getCurrencyRates}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    borderWidth: 1
  }
})
