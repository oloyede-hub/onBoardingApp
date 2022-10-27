import React, { useState, useRef} from 'react';
import {View, StyleSheet, FlatList, Text, StatusBar, Animated} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import slides from "../slides";
import OnboardingItem from '../components/OnboardingItem';
import Paginator from './Paginator';
import NextButton from '../components/NextButton';

const Onboarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const scrollX = useRef(new Animated.Value(0)).current;

    
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;

    const scrollTo = async () => {
        if(currentIndex < slides.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1})
        }else {
            try {
                await AsyncStorage.setItem("@viewedOnbarding", "true")
            } catch (error) {
                console.log("Errror @setItem", error);
            }
        }
    }



    return (
        <View style={styles.container}>
            <View style={{ flex: 3}}>
            <FlatList
                data={slides}
                renderItem={ ({ item }) => <OnboardingItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={item => item.id}
                
                onScroll={Animated.event([{nativeEvent: { contentOffset: {x: scrollX}}}], { useNativeDriver:false })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slideRef}
            />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100/slides.length)} />
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

export default Onboarding;
