import React, {useEffect, useState, useCallback} from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';

import asusImage from '../../../assets/Item-1.png'
import hpImage from '../../../assets/Item-2.png'
import ldlcImage from '../../../assets/Logo LDLC bleu cyan.png'
import iiyamaImage from '../../../assets/Logo Iiyama.svg.png'
import msiImage from '../../../assets/msi-logo_b.png'

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [availablePcs, setAvailablePcs] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedPc, setSelectedPc] = useState(null);
    const [searchError, setSearchError] = useState(''); // Erreur pour la recherche
    const [availablePcsError, setAvailablePcsError] = useState(''); // Erreur pour les PC disponibles
    const [brandsError, setBrandsError] = useState(''); // Erreur pour les marques
    const [loadingAvailablePcs, setLoadingAvailablePcs] = useState(true);
    const [loadingResults, setLoadingResults] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();


    const cleanKeys = (data) => {
        return data.map((item) => {
            const cleanedItem = {};
            Object.keys(item).forEach((key) => {
                const cleanedKey = key.replace(/["\u200B-\u200D\uFEFF]/g, "").trim();
                cleanedItem[cleanedKey] = item[key];
            });
            return cleanedItem;
        });
    };

    const fetchAvailablePcs = async () => {
        setAvailablePcsError(''); // Réinitialise l'erreur avant chaque nouvelle récupération
        setLoadingAvailablePcs(true);
        try {
            const response = await axios.get(`https://api-barcode-reader.vercel.app/api/search?query=Disponible`);
            const cleanedResults = cleanKeys(response.data);
            setAvailablePcs(cleanedResults);
        } catch (err) {
            if (err.response && err.response.data.error) {
                setAvailablePcsError(err.response.data.error);
            } else {
                setAvailablePcsError('Erreur lors de la récupération des PC disponibles.');
            }
        } finally {
            setLoadingAvailablePcs(false);
        }
    };

    const handleSearch = useCallback(
        debounce(async (searchQuery) => {
            setSearchError(''); // Réinitialise l'erreur avant chaque nouvelle recherche
            setLoadingResults(true);
            try {
                const response = await axios.get(
                    `https://api-barcode-reader.vercel.app/api/search?query=${encodeURIComponent(searchQuery)}`
                );
                const cleanedResults = cleanKeys(response.data);
                setResults(cleanedResults);
            } catch (err) {
                if (err.response && err.response.data.error) {
                    setSearchError(err.response.data.error);
                } else {
                    setSearchError('Erreur lors de la recherche.');
                }
            } finally {
                setLoadingResults(false);
            }
        }, 300),
        []
    );

    const fetchAllBrands = async () => {
        setBrandsError(''); // Réinitialise l'erreur avant chaque nouvelle récupération
        setLoadingBrands(true);
        try {
            const response = await axios.get(`https://api-barcode-reader.vercel.app/api/search?query= `);
            const cleanedResults = cleanKeys(response.data);
            const uniqueBrands = new Set(cleanedResults.map(pc => pc.Modèle.trim()));
            setBrands([...uniqueBrands]);
        } catch (err) {
            if (err.response && err.response.data.error) {
                setBrandsError(err.response.data.error);
            } else {
                setBrandsError('Erreur lors de la récupération des marques.');
            }
        } finally {
            setLoadingBrands(false);
        }
    };

    useEffect(() => {
        fetchAvailablePcs();
        fetchAllBrands();
    }, []);

    const openModal = (pc) => {
        setSelectedPc(pc);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPc(null);
    };

    // Effacement automatique de l'erreur après un délai
    useEffect(() => {
        if (searchError) {
            const timer = setTimeout(() => {
                setSearchError(''); // Efface l'erreur après 3 secondes
                setResults([])
            }, 3000);

            // Nettoyage du timer pour éviter les fuites de mémoire
            return () => clearTimeout(timer);
        }
    }, [searchError]);

    return (
        <View style={styles.container}>
            {/* Forme d'arrière-plan */}
            <View style={styles.backgroundShape}/>

            <Text style={styles.text}>Rechercher des informations sur un PC</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Rechercher..."
                autoCorrect={false}
                autoCapitalize="none"
                value={query}
                onChangeText={(text) => {
                    setQuery(text);
                    handleSearch(text);
                }}
            />


            {/* Section de résultats de recherche */}
            {loadingResults ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : searchError ? (
                <Text style={styles.errorText}>{searchError}</Text>
            ) : results.length > 0 && (
                <>
                    <Text style={styles.availableTitle}>Résultats de recherche</Text>
                    <ScrollView style={styles.results}>
                        {results.map((result, index) => (
                            <TouchableOpacity key={index} style={styles.resultItem} onPress={() => openModal(result)}>
                                <Text style={styles.resultText} onc>{result.Statut}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>
            )}

            {/* Section des marques disponibles */}
            <Text style={styles.availableTitle}>Marques Disponibles</Text>
            {loadingBrands ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : brandsError ? (
                <Text style={styles.errorText}>{brandsError}</Text>
            ) : brands.length > 0 ? (
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.brandsContainer}
                    showsHorizontalScrollIndicator={false} // Optionnel pour cacher la barre de défilement
                    style={styles.brandsScrollView}
                >
                    {brands.map((brand, index) => (
                        <View key={index} style={styles.brandBox}>
                            {brand.includes('ASUS') && (
                                <Image source={asusImage} style={styles.brandImage}/>
                            )}
                            {brand.includes('HP') && (
                                <Image source={hpImage} style={styles.brandImage}/>
                            )}
                            {brand.includes('LDLC') && (
                                <Image source={ldlcImage} style={styles.brandImage}/>
                            )}
                            {brand.includes('MSI') && (
                                <Image source={msiImage} style={styles.brandImage}/>
                            )}
                            {brand.includes('NB') && (
                                <Image source={iiyamaImage} style={styles.brandImage}/>
                            )}
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text>Aucune marque disponible.</Text>
            )}

            {/* Section de PC disponibles */}
            <Text style={styles.availableTitle}>PCs Disponibles</Text>
            {loadingAvailablePcs ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : availablePcsError ? (
                <Text style={styles.errorText}>{availablePcsError}</Text>
            ) : (
                <FlatList
                    horizontal
                    data={availablePcs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.availableItem} onPress={() => openModal(item)}>
                            <Text style={styles.availableText}>{item.SN}</Text>
                            <Image
                                source={{uri: 'https://via.placeholder.com/100'}} // Remplacer par l'URL réelle si nécessaire
                                style={styles.availableImage}
                            />
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList} // Ajoutez ce style pour contrôler l'espace
                />
            )}


            {/* Modal pour afficher les détails du PC sélectionné */}
            {selectedPc && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedPc.Statut}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    closeModal();
                                    navigation.navigate('Passeport', {SN: selectedPc.SN});
                                }}
                            >
                                <Text style={styles.buttonText}>Plus</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.buttonText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 36,
        margin: 10,
        color: 'white',
    },
    backgroundShape: {
        position: 'absolute',
        top: '25%', // Commence au milieu de la search bar
        left: 0,
        right: 0,
        bottom: 0, // Va jusqu'en bas de l'écran
        backgroundColor: '#99BAFF', // Couleur de la forme (à ajuster selon vos besoins)
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#0F192D'
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 18,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    flatList: {
        maxHeight: 120, // Limitez la hauteur pour éviter de prendre trop d'espace
        marginVertical: 0, // Réduire l'espacement vertical
    },
    availableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        color: 'white',
    },
    availableText: {
        fontSize: 14,
        marginBottom: 8,
    },
    availableImage: {
        width: 60,
        height: 60,
    },
    availableItem: {
        width: 100,
        height: 100,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    brandImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    brandItem: {
        backgroundColor: '#f0f0f0',

        borderRadius: 5,
    },
    brandText: {
        fontSize: 16,
    },
    brandsScrollView: {
        maxHeight: 145,
        marginVertical: 0,
    },
    brandsContainer: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    brandBox: {
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    searchResultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    results: {
        flex: 1,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    closeButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },

});

export default Search;