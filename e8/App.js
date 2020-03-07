import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button } from 'react-native';

export default function App() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [currencyRates, setCurrencyRates] = useState({})
  const [amountInEuros, setAmountInEuros] = useState('')


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
  
  return (
    <View style={styles.container}>
      <Text>{amountInEuros.toFixed(2)}</Text>
      <TextInput 
        style={styles.TextInput} 
        onChangeText={amount => setAmount(amount)}
      />
      <Picker
        selectedValue={currency}
        style={{ height: 50, width: 100 }}
        onValueChange={currency => {
          setCurrency(currency)
          console.log(currency)
          console.log(currencyRates[currency])
        }}
      >
        {/* mapin callback-funktio saa kaksi parametria, koska Picker.Item -komponentit vaativat
        key-attribuutille arvon */}

        {Object.keys(currencyRates).map((currencyCode, index) => {
          return (<Picker.Item label={currencyCode} value={currencyCode} key={index} />)
        })}

      </Picker>
      <Button
        title="convert"
        onPress={() => setAmountInEuros(amount / currencyRates[currency])}
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
