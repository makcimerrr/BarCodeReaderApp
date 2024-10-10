// Search.js
import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';

import AvailablePcs from '../components/AvailablePcs';
import Brands from '../components/Brands';
import ModalComponent from '../components/ModalComponent';
import SearchBar from '../components/SearchBar';
import {fetchAvailablePcs, fetchAllBrands, searchPcs} from '../../api/api';

const {height: screenHeight} = Dimensions.get('window');

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [availablePcs, setAvailablePcs] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedPc, setSelectedPc] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [availablePcsError, setAvailablePcsError] = useState('');
    const [brandsError, setBrandsError] = useState('');
    const [loadingAvailablePcs, setLoadingAvailablePcs] = useState(true);
    const [loadingResults, setLoadingResults] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [isScrollable, setIsScrollable] = useState(false);

    const handleSearch = useCallback(
        debounce(async (searchQuery) => {
            setSearchError('');
            setLoadingResults(true);
            try {
                const results = await searchPcs(searchQuery);
                setResults(results);
            } catch (err) {
                setSearchError(err.message);
            } finally {
                setLoadingResults(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [pcs, brands] = await Promise.all([fetchAvailablePcs(), fetchAllBrands()]);
                setAvailablePcs(pcs);
                setBrands(brands);
            } catch (err) {
                if (err.message.includes('PC disponibles')) {
                    setAvailablePcsError(err.message);
                } else if (err.message.includes('marques')) {
                    setBrandsError(err.message);
                }
            } finally {
                setLoadingAvailablePcs(false);
                setLoadingBrands(false);
            }
        };
        fetchInitialData();
    }, []);

    const openModal = (pc) => {
        setSelectedPc(pc);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPc(null);
    };

    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError('');
                setResults([])
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [searchError]);

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        setIsScrollable(contentHeight > (screenHeight - 300));
    };

    // Fonction pour naviguer vers la page des marques
    const handleViewAllBrands = () => {
        navigation.navigate('BrandsScreen'); // Remplacez 'BrandsScreen' par le nom de votre écran
    };

    // Fonction pour naviguer vers la page des PCs disponibles
    const handleViewAllPcs = () => {
        navigation.navigate('AvailablePcsScreen'); // Remplacez 'AvailablePcsScreen' par le nom de votre écran
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundShape}/>
            <Text style={styles.text}>Rechercher des informations sur un PC</Text>
            <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch}/>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={handleContentSizeChange}
                        scrollEnabled={isScrollable}
            >
                {loadingResults ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : searchError ? (
                    <Text style={styles.errorText}>{searchError}</Text>
                ) : results.length > 0 && (
                    <>
                        <Text style={styles.availableTitle}>Résultats de recherche</Text>
                        <ScrollView style={styles.results}>
                            {results.map((result, index) => (
                                <TouchableOpacity key={index} style={styles.resultItem}
                                                  onPress={() => openModal(result)}>
                                    <Text style={styles.resultText}>{result.Statut}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}

                <View style={styles.sectionContainer}>
                    <Text style={styles.availableTitle}>Nos Marques</Text>
                    <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllBrands}>
                        <Text style={styles.viewAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <Brands brands={brands} loading={loadingBrands} error={brandsError}/>

                <View style={styles.sectionContainer}>
                    <Text style={styles.availableTitle}>Disponible Maintenant</Text>
                    <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPcs}>
                        <Text style={styles.viewAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <AvailablePcs availablePcs={availablePcs} loading={loadingAvailablePcs} error={availablePcsError}
                              openModal={openModal}/>

                {selectedPc && (
                    <ModalComponent
                        selectedPc={selectedPc}
                        modalVisible={modalVisible}
                        closeModal={closeModal}
                        navigation={navigation}
                    />
                )}
            </ScrollView>
        </View>
    )
        ;
};

const styles = StyleSheet.create({
    text: {
        fontWeight: "200",
        fontSize: 36,
        marginRight: 50,
        marginLeft: 20,
        color: 'white',
    },
    backgroundShape: {
        position: 'absolute',
        top: '22%',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#99BAFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#0F192D'
    },
    scrollView: {
        flexGrow: 1,
    },
    scrollViewContent: {
        paddingBottom: 85,
    },
    availableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        color: 'white',
    },
    results: {
        maxHeight: 150,
    },
    resultItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    viewAllButton: {
        backgroundColor: '#E7EFFF',
        padding: 8,
        borderRadius: 8,
    },
    viewAllText: {
        color: '#4F88FF',
        fontWeight: 'bold',
    },
});
export default Search;