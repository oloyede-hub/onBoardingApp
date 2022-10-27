import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = () => {
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("@viewedOnbarding")
        } catch (error) {
            console.log("Error @viewedOnbarding", error);
        }
    }
    return (
        <View style={styles.container}>
            <Text>I am the homeScreen</Text>
            <TouchableOpacity onPress={clearOnboarding}>
                <Text>Clear Onboarding</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default HomeScreen;
