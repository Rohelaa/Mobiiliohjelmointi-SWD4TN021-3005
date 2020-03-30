import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [address, setAddress] = useState('Helsinki')
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })
  const [restaurants, setRestaurants] = useState([])

  const getNearbyRestaurants = () => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDFphG0tNCMKi55qSxc4ilYqtaApxueJKE&location=${region.latitude},${region.longitude}&radius=1000&keyword=restaurant&type=restaurant`)
    .then(response => response.json())
    .then(responseData => setRestaurants(responseData.results))
    .catch(error => {
      console.error(error.message)
    })
  }

  useEffect(() => {
    getNearbyRestaurants()
    console.log(restaurants)
  }, [region])

  const getLocationOnMap = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=DZmjQRh91WPCMxHsO0zbHAen5GTFW3Pz&location=${address}`)
    .then(response => response.json())
    .then(resData => resData.results[0].locations[0])
    .then(resData => setRegion({
      latitude: resData.latLng.lat,
      longitude: resData.latLng.lng,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    }))    
  }

  

  return (  
    <KeyboardAvoidingView style={styles.container} behavior='padding'> 
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChange={() => setRegion(region)}
      >
        {restaurants.map(r => (
          <Marker
            coordinate={{
              latitude: r.geometry.location.lat,
              longitude: r.geometry.location.lng,
            }}
            title={r.name}
            description={r.vicinity}
          />
        ))}
      </MapView>
      <View style={{ flex: 1 }}>
        <TextInput 
          style={styles.addressInput}
          onChangeText={text => {
            console.log(region)
            setAddress(text)
          }}
          value={address}
        />
        <Button 
          title="show"
          onPress={getLocationOnMap}
        />
      </View>
    </KeyboardAvoidingView>
      
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    flex: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  addressInput: {
    width: Dimensions.get('window').width,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  }
});
