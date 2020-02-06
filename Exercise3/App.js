import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

export default function App() {
  
  const [calculation, setCalculation] = useState({
      value1: '',
      value2: '',
      calcResult: '',
      calcType: '',
      id: ''
    })
  const [calculations, setCalculations] = useState([])

  const generateId = () => (

    // heittää varoitusta konsolissa, joten muutettava Number-oliosta Stringiksi 
    String(calculations.length + 1)
  )

  const calculateSum = () => {
    const result = Number(calculation.value1) + Number(calculation.value2)
    setCalculations([...calculations, 

      
      {
        ...calculation, 
        calcResult: result, 
        calcType: '+', 
        id: generateId()
      }
    ])
  }

  const calculateSubtraction = () => {
    const result = Number(calculation.value1) - Number(calculation.value2)
    console.log(result)
    setCalculations([...calculations, 
      {
        ...calculation,
        calcResult: result,
        calcType: '-',
        id: generateId()
      }
    ])
  }
  
  
    return (
      <View style={styles.container}>
        <Text>Result: {calculation.calcResult}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setCalculation({...calculation, value1: value})}
          value={calculation.value1}
          keyboardType='decimal-pad'
        />
        <TextInput 
          style={styles.textInput} 
          onChangeText={value => setCalculation({...calculation, value2: value})}
          value={calculation.value2}
          keyboardType='decimal-pad'
        />
        <View style={styles.buttons}>
          <Button 
            title="+" 
            onPress={calculateSum} 
          />  
          <Button  
            title="-" 
            onPress={calculateSubtraction} 
          />      
          
          
        </View>
        <Text>History</Text>
        <FlatList 
          data={calculations}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 30
  },
  textInput: {
    width: 200,
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    
  }
})
