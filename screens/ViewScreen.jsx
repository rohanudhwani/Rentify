import { Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewScreen = ({ route }) => {
    const property = route.params.property;
    const { width, height } = Dimensions.get('window');



    const [room, setRoom] = useState(1)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: width * 2, justifyContent: 'center' }}
                decelerationRate="fast"
                snapToInterval={width}
                snapToAlignment="center"
>
                <View style={{ width: width * 2, flexDirection: 'row' }}>
                    <ImageBackground source={{ uri: Object.values(property.images)[room] }} style={{ width: '100%', height }}>
                        {/* Image Content */}
                    </ImageBackground>
                </View>
            </ScrollView>


            <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection:"row", justifyContent:"center", gap:5 }}>
                <TouchableOpacity onPress={() => setRoom(0)} style={{justifyContent:"center", marginTop:80}}>
                    <Image style={{ width: 100, height: 100, borderRadius: 20, borderColor: "#5552E9", borderWidth: room==0 ? 4 : 2 }} source={{ uri: Object.values(property.images)[0] }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', maxWidth: 220, color:"white" }}>{Object.keys(property.images)[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRoom(1)} style={{justifyContent:"center", alignItems:"center", marginBottom:60}}>
                    <Image style={{ width: 100, height: 100, borderRadius: 20, borderColor: "#5552E9", borderWidth: room==1 ? 4 :  2 }} source={{ uri: Object.values(property.images)[1] }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', maxWidth: 220, color:"white" }}>{Object.keys(property.images)[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRoom(2)} style={{justifyContent:"center", marginTop:80}}>
                    <Image style={{ width: 100, height: 100, borderRadius: 20, borderColor: "#5552E9", borderWidth: room==2 ? 4 :  2 }} source={{ uri: Object.values(property.images)[2] }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', maxWidth: 220, color:"white" }}>{Object.keys(property.images)[2]}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ViewScreen;
