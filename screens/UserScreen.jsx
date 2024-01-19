import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {

    const user = auth.currentUser;
    const navigation = useNavigation()

    const handleSignOut = async () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        }).catch((error) => {
            console.log(error.message)
        })
    };
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 60 }}>User Details</Text>
            <View>
                <Text style={{ fontSize: 16, marginBottom: 30 }}>Email: {auth.currentUser.email}</Text>
            </View>
            <TouchableOpacity onPress={() => handleSignOut()} style={{ marginTop: 30, marginLeft: 20, marginRight: 20, height: 50, backgroundColor: "#3834E7", borderRadius: 10, justifyContent: "center", alignItems: "center", width: 200 }}>
                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 15, color: "white", fontWeight: "bold" }}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default UserScreen

const styles = StyleSheet.create({})