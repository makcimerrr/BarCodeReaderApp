import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer FontAwesome

const BottomTabNavigation = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Home');
    const opacity = useRef(new Animated.Value(1)).current; // Valeur d'animation

    // Utilisation de useNavigationState pour obtenir la route active
    const navigationState = useNavigationState((state) => state);

    useEffect(() => {
        // Récupérer la route active
        const currentRoute = navigationState?.routes[navigationState.index]?.name;
        setActiveTab(currentRoute);
        // Lancer l'animation
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 0, // Disparaît
                duration: 250, // Durée de l'animation en millisecondes
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1, // Réapparaît
                duration: 250,
                useNativeDriver: true,
            })
        ]).start();
    }, [navigationState]);

    return (
        <View style={styles.container}>
            <AnimatedTouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={[styles.tab, activeTab === 'Home' && styles.activeTab, {opacity}]} // Appliquer le style actif si c'est le cas
            >
                <View style={[styles.iconContainer, activeTab === 'Home' && styles.activeIconContainer]}>
                    <Icon name="home" size={24} color={activeTab === 'Home' ? '#fff' : '#fff'}/>
                </View>
                <Text style={[styles.label, activeTab === 'Home' && styles.activeLabel]}>Home</Text>
            </AnimatedTouchableOpacity>
            <AnimatedTouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={[styles.tab, activeTab === 'Search' && styles.activeTab, {opacity}]} // Appliquer le style actif si c'est le cas
            >
                <View style={[styles.iconContainer, activeTab === 'Search' && styles.activeIconContainer]}>
                    <Icon name="search" size={24} color={activeTab === 'Search' ? '#fff' : '#fff'}/>
                </View>
                <Text style={[styles.label, activeTab === 'Search' && styles.activeLabel]}>Search</Text>
            </AnimatedTouchableOpacity>
        </View>
    );
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#0F192D',
    },
    tab: {
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    activeIconContainer: {
        position: "relative",
        backgroundColor: '#4F88FF',
        borderRadius: 16,
        paddingRight: 20,
        paddingLeft: 20,
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
    activeLabel: {
        color: '#fff',
    },
});

export default BottomTabNavigation;