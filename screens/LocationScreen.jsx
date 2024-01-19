import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';

const INITIAL_REGION = {
    latitude: 20.5937,
    longitude: 81.9629,
    latitudeDelta: 26,
    longitudeDelta: 26,
}




const LocationScreen = ({ route }) => {

    const property = route.params.property;

    const coordinate = { latitude: property.location.latitude, longitude: property.location.longitude }

    const zoomedRegion = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }

    const [rating, setRating] = useState(0);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#EEF3F6" }}>
            <MapView style={{ width: '100%', height: '75%' }} initialRegion={zoomedRegion}>
                <Marker coordinate={coordinate} />
            </MapView>

            <View style={{ flex: 1, flexDirection: "row", gap: 9, marginRight: 20, marginLeft: 20, marginTop: 10 }}>
                <Image source={{uri: property.mainImage}} style={{ width: 150, height: 150, borderRadius: 20 }} />
                <View style={{ justifyContent:"space-evenly", flexDirection:"column", gap:15 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', maxWidth:220 }}>{property.name}</Text>
                    <Text style={{ fontSize: 16, color: "gray" }}>₹ {property.price}</Text>
                    <StarRating
                        rating={rating}
                        onChange={setRating}
                        color='#5552E9'
                        maxStars={4}
                        enableHalfStar={false}
                        starSize={28} style={{ marginBottom: 60 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LocationScreen

const styles = StyleSheet.create({})


