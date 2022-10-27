import React from 'react';
import {View, StyleSheet,Text, Image, useWindowDimensions } from 'react-native';

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions()
    return (
        <View style={[ styles.container]}>
            <Image source={item.image}  style={[styles.image, { width,  resizeMode: 'contain'}]} />
            <View style={{ flex: 0.3, width}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 0.7,
        justifyContent: "center"
    },
    title: {
        fontSize: 28,
        marginBottom:10,
        textAlign: "center",
        color: "#493d8a",
        fontWeight: "800"
    },
    description: {
        paddingHorizontal:64,
        textAlign: "center",
        color: "#62656b",
        fontWeight: "300"
    }
})

export default OnboardingItem;
