import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, Animated, View, StyleSheet} from 'react-native'; // Importation d'Animated
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/app/page/Home.js';
import SearchScreen from "./src/app/page/Search.js";
import DetailsScreen from "./src/app/page/DetailsPC";
import BottomTabNavigation from './src/app/components/BottomTabNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
    const [showBottomTab, setShowBottomTab] = useState(false);
    const navigationRef = useRef();
    const bottomTabOpacity = useRef(new Animated.Value(0)).current; // Animation de l'opacité
    const bottomTabPosition = useRef(new Animated.Value(100)).current; // Animation de la position (hors écran au départ)

    useEffect(() => {
        const unsubscribe = navigationRef.current?.addListener('state', (e) => {
            const routeName = e.data.state.routes[e.data.state.index].name;
            const isNotHome = routeName !== 'Home';
            setShowBottomTab(isNotHome);

            // Animation d'apparition/disparition de la barre de navigation
            Animated.parallel([
                Animated.timing(bottomTabOpacity, {
                    toValue: isNotHome ? 1 : 0, // Opacité à 1 si la barre doit apparaître, sinon 0
                    duration: 300, // Durée de l'animation en ms
                    useNativeDriver: true, // Utilisation du moteur natif pour des performances optimales
                }),
                Animated.timing(bottomTabPosition, {
                    toValue: isNotHome ? 0 : 100, // Décalage vers le bas (hors écran) si Home, sinon à 0 (visible)
                    duration: 300, // Durée de l'animation
                    useNativeDriver: true,
                })
            ]).start();
        });

        return unsubscribe;
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Search" component={SearchScreen}
                                  options={{headerShown: true, gestureEnabled: false}}/>
                    <Stack.Screen name="Passeport" component={DetailsScreen}
                                  options={{headerShown: true, gestureEnabled: false}}/>
                </Stack.Navigator>
                <Animated.View
                    style={[
                        styles.bottomTab,
                        {
                            opacity: bottomTabOpacity,
                            transform: [{translateY: bottomTabPosition}]
                        }
                    ]}
                >
                    <BottomTabNavigation/>
                </Animated.View>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    bottomTab: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});