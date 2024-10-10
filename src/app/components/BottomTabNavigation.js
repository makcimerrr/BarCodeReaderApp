import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer FontAwesome

const BottomTabNavigation = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Home');

    // Utilisation de useNavigationState pour obtenir la route active
    const navigationState = useNavigationState((state) => state);

    useEffect(() => {
        // Récupérer la route active
        const currentRoute = navigationState?.routes[navigationState.index]?.name;
        setActiveTab(currentRoute);
    }, [navigationState]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={[styles.tab, activeTab === 'Home' && styles.activeTab]} // Appliquer le style actif si c'est le cas
            >
                <Icon name="home" size={24} color={activeTab === 'Home' ? '#000' : '#fff'}/>
                <Text style={[styles.label, activeTab === 'Home' && styles.activeLabel]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={[styles.tab, activeTab === 'Search' && styles.activeTab]} // Appliquer le style actif si c'est le cas
            >
                <Icon name="search" size={24} color={activeTab === 'Search' ? '#000' : '#fff'}/>
                <Text style={[styles.label, activeTab === 'Search' && styles.activeLabel]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Passeport')}
                style={[styles.tab, activeTab === 'Passeport' && styles.activeTab]} // Appliquer le style actif si c'est le cas
            >
                <Icon name="file-text" size={24} color={activeTab === 'Passeport' ? '#000' : '#fff'}/>
                <Text style={[styles.label, activeTab === 'Passeport' && styles.activeLabel]}>Passeport</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    activeTab: {
        backgroundColor: '#ffffff', // Couleur de l'onglet actif
        borderRadius: 10,
        padding: 5,
    },
    label: {
        color: '#fff', // Couleur du texte normal
        fontSize: 12,
        marginTop: 4,
    },
    activeLabel: {
        color: '#000', // Couleur du texte pour l'onglet actif
    },
});

export default BottomTabNavigation;