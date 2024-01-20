import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EvilIcons, Feather, Entypo } from '@expo/vector-icons';
import Slider from '../component/Slider';
import Properties from '../component/Properties';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';


const HomeScreen = ({ propertiesData }) => {

  const [selectedType, setSelectedType] = useState("House")

  const navigation = useNavigation()

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [searchTerm, setSearchTerm] = useState("")


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [areaName, setAreaName] = useState("Area")

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location);

        // Check if location is available
        if (location && location.coords) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}&addressdetails=1`
            );
            const data = await response.json();
            if (data && data.address) {
              // Extract the area name from the response
              setAreaName(data.address.county || data.address.state_district);
            }
          } catch (error) {
            console.log('Error fetching or parsing data:', error);
          }
        } else {
          console.log('Location not available');
        }
      } catch (error) {
        console.log('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [location]);


  const geolib = require('geolib');

  const findDistance = (latitude, longitude) => {
    if (!location || !location.coords) {
      // Handle the case where location or its coords property is undefined
      return 0; // or some default value
    }
    const toKilometers = (meters) => meters / 1000;

    const distance = geolib.getDistance({ latitude: location?.coords.latitude, longitude: location?.coords.longitude, }, { latitude, longitude });
    const distanceInKm = toKilometers(distance);

    return distanceInKm;
  };



  const [properties, setProperties] = useState(propertiesData && typeof propertiesData === 'object'
    ? Object.values(propertiesData).filter((property) => property.propertyType === 'House')
    : [])

  const [filtersApplied, setFiltersApplied] = useState(false)

  useEffect(() => {

    if (filters.type === null &&
      filters.price === null &&
      filters.distance === null &&
      filters.bedroom === null &&
      filters.washroom === null) { setFiltersApplied(false) } else { setFiltersApplied(true) }

    if (
      filtersApplied === false && searchTerm === ""
    ) {
      // If all filters are null, return early
      return;
    }

    const filteredBySearchTerm = properties.filter((property) => {
      return property.name.toLowerCase().includes(searchTerm.toLowerCase())
    });

    const newProperties = filteredBySearchTerm.filter((property) => {
      if (filtersApplied === false) { return property }
      else {
        return (
          property.houseType === filters.type &&
          property.price >= 1000 * filters.price[0] &&
          property.price <= 1000 * filters.price[1] &&
          findDistance(property.location.latitude, property.location.longitude) >= filters.distance[0] &&
          findDistance(property.location.latitude, property.location.longitude) <= filters.distance[1] &&
          property.bedroomCount === filters.bedroom &&
          property.washroomCount === filters.washroom
        );
      }
    });

    setProperties(newProperties);
  }, [filters, searchTerm]);


  const handleTypeButton = (type) => {
    if (type === "House") {
      setSelectedType("House")
      const data = Object.values(propertiesData).filter(
        (property) => property.propertyType === 'House'
      );
      setProperties(data)
    } else if (type === "Villa") {
      setSelectedType("Villa")
      const data = Object.values(propertiesData).filter(
        (property) => property.propertyType === 'Villa'
      );
      setProperties(data)
    } else if (type === "Apartment") {
      setSelectedType("Apartment")
      const data = Object.values(propertiesData).filter(
        (property) => property.propertyType === 'Apartment'
      );
      setProperties(data)
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: "#EEF3F6" }}>
      <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 20, marginRight: 30 }}>
        <View>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 20, fontWeight: "800" }}>Hi Rohan !</Text>
          <View style={{ flexDirection: "row", gap: 2 }}>
            <EvilIcons name="location" size={20} color="black" />
            <Text>{areaName}</Text>
          </View>
        </View>
        <EvilIcons name="bell" size={32} color="black" />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20, marginRight: 20, height: 50, borderColor: '#3834E7', borderWidth: 2, borderRadius: 10, paddingLeft: 20, fontFamily: 'Inter_400Regular', fontSize: 15, color: 'gray', position: 'relative', }}>
        <TextInput value={searchTerm} onChangeText={(text) => setSearchTerm(text)} placeholder="Search" style={{ flex: 1, height: '100%', }} />
        <Feather name="search" size={24} color="gray" style={{ position: 'absolute', right: 15, }} />
      </View>

      <View style={{ marginTop: 20, alignItems: 'center', justifyContent: "center", flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity onPress={() => handleTypeButton("House")} style={{ width: 110, height: 40, backgroundColor: selectedType === "House" ? "#3834E7" : "white", borderRadius: 10, justifyContent: "center", alignItems: "center", borderColor: "#3834E7", borderWidth: 2 }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 15, color: selectedType === "House" ? "white" : "black", fontWeight: "bold" }}>House</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTypeButton("Villa")} style={{ width: 110, height: 40, backgroundColor: selectedType === "Villa" ? "#3834E7" : "white", borderRadius: 10, justifyContent: "center", alignItems: "center", borderColor: "#3834E7", borderWidth: 2 }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 15, color: selectedType === "Villa" ? "white" : "black", fontWeight: "bold" }}>Villa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTypeButton("Apartment")} style={{ width: 110, height: 40, backgroundColor: selectedType === "Apartment" ? "#3834E7" : "white", borderRadius: 10, justifyContent: "center", alignItems: "center", borderColor: "#3834E7", borderWidth: 2 }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 15, color: selectedType === "Apartment" ? "white" : "black", fontWeight: "bold" }}>Apartment</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 220 }}>

        <Slider />

        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between", marginRight: 20, alignItems: "baseline", marginBottom: 8 }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 18, fontWeight: "bold" }}>Properties for you</Text>
          <Text onPress={() => console.log(findDistance(28.704060, 77.102493))} style={{ fontFamily: 'Inter_400Regular', fontSize: 13, fontWeight: "bold", color: "#5552E9" }}>See all</Text>
        </View>

        {/* Shows separate properties based on the type of property selected */}

        {properties.map((property, index) => (
          <Properties key={index} property={property} />
        ))}

      </ScrollView>




    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})