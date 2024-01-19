import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, fireDb } from '../firebase'
import { doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context'
import Properties from '../component/Properties'

const WishlistScreen = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchWishlist = async () => {
            try {
                const userDocRef = doc(fireDb, 'users', auth.currentUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const wishlistData = userData.wishlist || [];
                    setProperties(wishlistData);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist();
        setLoading(false)
    }, [auth.currentUser.uid]);


    return (
        <SafeAreaView>
            {loading ? (
                <View style={{ alignItems: "center", justifyContent: "center"}}>
                    <Text>Loading...</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View>
                    {properties.length === 0 ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Wishlist</Text>
                            <Text>No Items in Wishlist</Text>
                        </View>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 220 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf: "center" }}>Wishlist</Text>
                            {properties.map((property, index) => (
                                <Properties key={index} property={property} />
                            ))}
                        </ScrollView>
                    )
                    }
                </View>
            )}
        </SafeAreaView>
    )
}

export default WishlistScreen

const styles = StyleSheet.create({})