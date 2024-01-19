import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Properties = ({ property }) => {

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("Detail", { property });
  };

  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={handlePress}>
      <View style={{ flexDirection: "row" }} onPress={() => navigation.navigate("Detail")}>
        <View style={{ width: 110, height: 120, overflow: "hidden" }}>
          <Image source={{uri: property.mainImage}} style={{ width: 130, height: 120, borderRadius: 20, marginRight: 10 }} />
        </View>
        <View style={{ marginLeft: 10, gap: 10, justifyContent: "space-evenly" }}>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16, fontWeight: "bold", marginTop: 10 }}>{property.name}</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 12, color: "#5552E9", marginBottom: 10 }}>{property.area}</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 15, color: "#5552E9", marginBottom: 20 }}>₹{property.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Properties

const styles = StyleSheet.create({})