import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import Swiper from 'react-native-swiper'
import { Screen1, Screen2, Screen3 } from '../assets';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const styles = StyleSheet.create({
      
});



const OnBoardingScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const checkOnBoardingStatus = async () => { 
      try {
        const value = await AsyncStorage.getItem('@onBoarding_Complete')
        console.log('value', value)
        if(value !== null && value ==="true") {
          navigation.replace("Login");
        }
      } catch(e) {
        console.log('error', e)
      }
    };

    checkOnBoardingStatus();
  }, [])

  const handleOnBoardingComplete = async (e) => {
    // console.log('OnBoarding Complete', e)
    if( e === 2 ){
      try{
        await AsyncStorage.setItem('@onBoarding_Complete', 'true');
        navigation.navigate("SignUp");
      } catch (e){
        console.log('error', e)
      }
    }
  }


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',}}>
      <Swiper onIndexChanged={handleOnBoardingComplete}>
        <OnBoardingContent image={Screen1} titl="Looking for a convenient home?" description="Your search ends here!" />
        <OnBoardingContent image={Screen2} titl="No better place to rent a home" description="Rentify gives the best solutions" />
        <OnBoardingContent image={Screen3} titl="Creating memories since 1993" description="Rentify your life!" />
      </Swiper>
    </View>
  )
}

export const OnBoardingContent = ({ image, titl, description }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={image} style={{ width: '100%', height: '75%', resizeMode: 'cover' }} />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#555', marginTop: 24 }}>{titl}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginTop: 15 }}>{description}</Text>
      </View>
    </View>
  );
};


export default OnBoardingScreen;

