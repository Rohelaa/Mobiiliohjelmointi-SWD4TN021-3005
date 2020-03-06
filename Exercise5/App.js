import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import History from "./History";
import React from 'react';
import Calculator from "./Calculator";



const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Calculator" 
        component={Calculator}
        options={{
          headerTitle: 'Calculator'
        }} 
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerTitle: 'History'
        }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}


