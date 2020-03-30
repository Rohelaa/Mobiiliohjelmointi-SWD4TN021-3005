import React, { useState, useEffect } from "react";
import { Text, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get('window');
console.log(Dimensions.get('window'));


const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default function MapScreen(props) {	
	const [region, setRegion] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	})

	const address = props.route.params.address
	console.log(props);

	const fetchLocation = () => {
		fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=DZmjQRh91WPCMxHsO0zbHAen5GTFW3Pz&location=${address}`)
		.then(response => response.json())
		//.then(resData => console.log(resData.results[0].locations[0].latLng))
		.then(resData => resData.results[0].locations[0].latLng)
		.then(locationData => setRegion({
			...region,
			latitude: locationData.lat,
			longitude: locationData.lng
		}))
		.catch(error => console.error(error))
	}

	useEffect(() => {
		fetchLocation()
	}, [])
	
	return (
		<MapView 
			style={{ flex: 1 }}
			region={region}
		>
			<Marker 
				coordinate={{
					latitude: region.latitude,
					longitude: region.longitude
				}}
			/>
		</MapView>
	)
}