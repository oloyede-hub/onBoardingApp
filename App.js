import React,{ useState, useEffect } from 'react';
import {View, StyleSheet, Text,ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
// import { useEffect, useState } from 'react'; 
import AsyncStorage from "@react-native-async-storage/async-storage";


import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';




const Loading = () => {

  return(
    <View>
      <ActivityIndicator size="large" />
    </View>
  )
}




const App = () => {
  const [loading, setLoading ] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);


  const checkOnboarding = async () => {
    try{
      const value = await AsyncStorage.getItem('@viewedOnbarding')
      if(value !== null) {
        setViewedOnboarding(true)
      }
    }catch (e) {
        console.log("Error @checkOnboarding: ", e )
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, []);


  return (
    <View style={styles.container}>
        {loading ? <Loading /> : viewedOnboarding ? <HomeScreen />: <Onboarding />}
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})

export default App;
