import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { DetailScreen, FilterScreen, HomeScreen, LocationScreen, LoginScreen, OnBoardingScreen, SignUpScreen, UserScreen, ViewScreen, WishlistScreen } from './screens';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect, useState } from 'react';
import BottomTab from './component/BottomTab';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { Provider } from 'react-redux';
import store from './redux/store';

const userRef = ref(db, '/properties');

const Stack = createNativeStackNavigator()


const MyComponent = ({ setActiveScreen }) => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentScreen = navigation.getCurrentRoute().name
      setActiveScreen(currentScreen)
    });

    return () => { unsubscribe() }
  }, [navigation, setActiveScreen])
}


export default function App() {

  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_700Bold,
  });

  const [activeScreen, setActiveScreen] = useState("")


  const [propertiesData, setPropertiesData] = useState(null);

  // Attach an asynchronous callback to read the data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setPropertiesData(data);
        })
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    // You can show a loading indicator here if needed
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!fontsLoaded && !fontError) {
    console.log("Font not loaded")
    return null;
  }

  const screensWithoutBottomTab = ["SignUp", "Login", "OnBoarding", "Filter", "Detail", "Location", "View"];

  // onValue(userRef, (snapshot) => {
  //   const data = snapshot.val();
  //   setPropertiesData(data);
  // }, {
  //   onlyOnce: true, // This ensures the callback is triggered only once
  // });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyComponent setActiveScreen={setActiveScreen} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} propertiesData={propertiesData} />}
          </Stack.Screen>
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="View" component={ViewScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>


        {screensWithoutBottomTab.includes(activeScreen) ? (
          null
        ) : (
          <BottomTab activeScreen={activeScreen} />
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});
