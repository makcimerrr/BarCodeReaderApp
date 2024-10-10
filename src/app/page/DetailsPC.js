import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';

// Fonction pour nettoyer les clés
const cleanKeys = (data) => {
    const cleanedItem = {};
    Object.keys(data).forEach((key) => {
        const cleanedKey = key.replace(/["\u200B-\u200D\uFEFF]/g, "").trim();
        cleanedItem[cleanedKey] = data[key];
    });
    return cleanedItem;
};

const PcDetails = ({route}) => {
    const {SN} = route.params; // Récupère le SN passé via la navigation
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Pour afficher un indicateur de chargement

    // Fonction pour récupérer les détails du PC via l'API
    const fetchPcDetails = async () => {
        try {
            const response = await axios.get(`https://api-barcode-reader.vercel.app/api/hardware/${SN}`);
            const cleanedData = cleanKeys(response.data);
            setData(cleanedData);
            setLoading(false); // Indicateur de fin de chargement
        } catch (err) {
            setError('PC non trouvé');
            setData(null);
            setLoading(false); // Indicateur de fin de chargement même en cas d'erreur
        }
    };

    // Appel de l'API au montage du composant
    useEffect(() => {
        fetchPcDetails();
    }, []);

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

    return (
        <View style={styles.container}>
            {data ? (
                <View>
                    <Text style={styles.title}>Détails du PC :</Text>
                    <Text style={styles.info}>Statut : {data.Statut}</Text>
                    <Text style={styles.info}>Numéro de série : {data.SN}</Text>
                    {/* Ajoute ici d'autres informations nécessaires */}
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default PcDetails;