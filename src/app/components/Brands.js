// Brands.js
import React from 'react';
import {ScrollView, Text, View, Image, ActivityIndicator, StyleSheet} from 'react-native';
import asusImage from '../../../assets/Item-1.png'
import hpImage from '../../../assets/Item-2.png'
import ldlcImage from '../../../assets/Logo LDLC bleu cyan.png'
import iiyamaImage from '../../../assets/Logo Iiyama.svg.png'
import msiImage from '../../../assets/msi-logo_b.png'

const Brands = ({brands, loading, error}) => {
    if (loading) return <ActivityIndicator size="large" color="#0000ff"/>;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (brands.length === 0) return <Text>Aucune marque disponible.</Text>;

    return (
        <ScrollView
            horizontal
            contentContainerStyle={styles.brandsContainer}
            showsHorizontalScrollIndicator={false}
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
    );
};

const styles = StyleSheet.create({
    brandImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    brandBox: {
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    brandsScrollView: {
        maxHeight: 145,
        marginVertical: 0,
    },
    brandsContainer: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default Brands;