import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Animated, ScrollView} from 'react-native';
import axios from 'axios';
import {MaterialIcons} from '@expo/vector-icons';

const cleanKeys = (data) => {
    const cleanedItem = {};
    Object.keys(data).forEach((key) => {
        const cleanedKey = key.replace(/["\u200B-\u200D\uFEFF]/g, "").trim();
        cleanedItem[cleanedKey] = data[key];
    });
    return cleanedItem;
};

const PcDetails = ({route}) => {
    const {SN} = route.params;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [contrat, setContrat] = useState(null);
    const [statut, setStatut] = useState(null);
    const [showContratOptions, setShowContratOptions] = useState(false);
    const [showStatutOptions, setShowStatutOptions] = useState(false);
    const [contratAnimation] = useState(new Animated.Value(0));
    const [statutAnimation] = useState(new Animated.Value(0));

    const fetchPcDetails = useCallback(async () => {
        try {
            const response = await axios.get(`https://api-barcode-reader.vercel.app/api/hardware/${SN}`);
            const cleanedData = cleanKeys(response.data);
            setData(cleanedData);
            setContrat(cleanedData.Contrat);
            setStatut(cleanedData.Statut)
            setLoading(false);
        } catch (err) {
            setError('PC non trouvé');
            setLoading(false);
        }
    }, [SN]);

    useEffect(() => {
        fetchPcDetails();
    }, [fetchPcDetails]);

    const toggleContratOptions = () => {
        setShowContratOptions(prev => !prev);
        Animated.timing(contratAnimation, {
            toValue: showContratOptions ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const toggleStatutOptions = () => {
        setShowStatutOptions(prev => !prev);
        Animated.timing(statutAnimation, {
            toValue: showStatutOptions ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const optionsHeight = (animation, itemLength) => animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, itemLength > 2 ? 150 : itemLength * 50], // Ajuster la hauteur maximale
    });

    const optionsOpacity = (animation) => animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // Pour rendre les options complètement invisibles quand repliées
    });

    const options = [
        {label: "Oui", value: "Oui"},
        {label: "Non", value: "Non"}
    ];

    const optionsStatut = [
        {label: "Disponible", value: "Disponible"},
        {label: "Piscine", value: "Piscine"},
        {label: "Promo 2022", value: "Promo 2022"},
        {label: "Promo P1 - 2023", value: "Promo P1 - 2023"},
        {label: "Promo P2 - 2023", value: "Promo P2 - 2023"},
        {label: "Promo P1 - 2024", value: "Promo P1 - 2024"},
        {label: "Prêt CSM", value: "Prêt CSM"},
        {label: "Salon", value: "Salon"},
        {label: "Vol", value: "Vol"},
        {label: "Autre", value: "Autre"},
        {label: "Stage", value: "Stage"},
        {label: "À RESET", value: "À RESET"},
    ];

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const getGuaranteeColor = (garanti) => {
        switch (garanti) {
            case 'Application':
                return styles.greenTag;
            case 'Chèque':
                return styles.orangeTag;
            case 'Aucune':
                return styles.redTag;
            default:
                return styles.defaultTag;
        }
    };

    return (
        <View style={styles.container}>
            {data ? (
                <>
                    <View style={styles.detailsContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: data.imageUrl || 'https://images.unsplash.com/photo-1445620466293-d6316372ab59?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                                style={styles.availableImage}
                            />
                            <TouchableOpacity style={styles.heartIcon} onPress={() => setLiked(!liked)}>
                                <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={24}
                                               color={liked ? 'red' : 'white'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{data.Modèle}</Text>
                            <View style={[styles.garantiTag, getGuaranteeColor(data.Garanti)]}>
                                <Text style={styles.garantiText}>{data.Garanti}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.dollarSign}>$</Text>
                                <Text style={styles.price}>{data.Prix || '450'}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.titleSection}>Contrat</Text>
                        {contrat !== null && (
                            <>
                                <TouchableOpacity
                                    style={styles.customPicker}
                                    onPress={toggleContratOptions}
                                >
                                    <Text style={styles.customPickerText}>{contrat}</Text>
                                    <MaterialIcons name="arrow-drop-down" size={24} color="black"
                                                   style={styles.arrowIcon}/>
                                </TouchableOpacity>
                                <Animated.View style={[styles.optionsContainer, {
                                    height: optionsHeight(contratAnimation, options.length),
                                    opacity: optionsOpacity(contratAnimation),
                                    overflow: 'hidden'
                                }]}>
                                    <ScrollView>
                                        {options.map((item) => (
                                            <TouchableOpacity key={item.value} onPress={() => {
                                                setContrat(item.value);
                                                toggleContratOptions();
                                            }}>
                                                <Text style={styles.optionText}>{item.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </Animated.View>
                            </>
                        )}
                    </View>

                    <View>
                        <Text style={styles.titleSection}>Statut</Text>
                        {statut !== null && (
                            <>
                                <TouchableOpacity
                                    style={styles.customPicker}
                                    onPress={toggleStatutOptions}
                                >
                                    <Text style={styles.customPickerText}>{statut}</Text>
                                    <MaterialIcons name="arrow-drop-down" size={24} color="black"
                                                   style={styles.arrowIcon}/>
                                </TouchableOpacity>
                                <Animated.View style={[styles.optionsContainer, {
                                    height: optionsHeight(statutAnimation, optionsStatut.length),
                                    opacity: optionsOpacity(statutAnimation),
                                    overflow: 'hidden'
                                }]}>
                                    <ScrollView>
                                        {optionsStatut.map((item) => (
                                            <TouchableOpacity key={item.value} onPress={() => {
                                                setStatut(item.value);
                                                toggleStatutOptions();
                                            }}>
                                                <Text style={styles.optionText}>{item.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </Animated.View>
                            </>
                        )}
                    </View>
                </>
            ) : (
                <Text>Pas de données disponibles</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    availableImage: {
        width: 197,
        height: 190,
        marginBottom: 8,
        borderRadius: 14,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5,
    },
    garantiTag: {
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    greenTag: {
        backgroundColor: '#CFF7D3',
    },
    orangeTag: {
        backgroundColor: '#FFAA00',
    },
    redTag: {
        backgroundColor: '#FFD200',
    },
    infoContainer: {
        marginLeft: 16,
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    dollarSign: {
        fontSize: 24,
        marginRight: 2,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    customPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#a9a9a9',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        height: 40,
        width: 240,
        marginTop: 8,
    },
    customPickerText: {
        flex: 1,
        fontSize: 16,
    },
    arrowIcon: {
        alignSelf: 'center',
    },
    optionsContainer: {
        borderWidth: 1,
        borderColor: '#a9a9a9',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 5,
        backgroundColor: '#ffffff',
    },
    optionText: {
        padding: 12,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    titleSection: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default PcDetails;