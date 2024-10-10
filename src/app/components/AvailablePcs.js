import React from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

const AvailablePcs = ({availablePcs, loading, error, openModal}) => {
    if (loading) return <ActivityIndicator size="large" color="#0000ff"/>;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <FlatList
            horizontal
            data={availablePcs}
            keyExtractor={(item) => item.SN}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.availableItem} onPress={() => openModal(item)}>
                    <Image
                        source={{uri: item.imageUrl || 'https://via.placeholder.com/100'}}
                        style={styles.availableImage}
                    />
                    <Text style={styles.availableText}>{item.Modèle}</Text>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
        />
    );
};

const styles = StyleSheet.create({
    flatList: {
        maxHeight: 200,
        marginVertical: 0,
    },
    availableText: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    availableImage: {
        width: 100,
        height: 100,
        marginBottom: 8,
        alignSelf: 'center',
    },
    availableItem: {
        width: 190,
        height: 160,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default AvailablePcs;