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
                    {item && item.Modèle && typeof item.Modèle === 'string' && item.Modèle.includes('ASUS') && (
                        <Image
                            source={{uri: item.imageUrl || 'https://images.unsplash.com/photo-1445620466293-d6316372ab59?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                            style={styles.availableImage}
                        />
                    )}
                    {item && item.Modèle && typeof item.Modèle === 'string' && item.Modèle.includes('HP') && (
                        <Image
                            source={{uri: item.imageUrl || 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                            style={styles.availableImage}
                        />
                    )}
                    {item && item.Modèle && typeof item.Modèle === 'string' && item.Modèle.includes('LDLC') && (
                        <Image
                            source={{uri: item.imageUrl || 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dx'}}
                            style={styles.availableImage}
                        />
                    )}
                    {item && item.Modèle && typeof item.Modèle === 'string' && item.Modèle.includes('MSI') && (
                        <Image
                            source={{uri: item.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                            style={styles.availableImage}
                        />
                    )}
                    {item && item.Modèle && typeof item.Modèle === 'string' && item.Modèle.includes('NB') && (
                        <Image
                            source={{uri: item.imageUrl || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                            style={styles.availableImage}
                        />
                    )}
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
        borderRadius: 8,
    },
    availableText: {
        fontSize: 16,
        marginTop: 8,
        marginRight: 90,
    },
    availableImage: {
        width: 200,
        height: 120,
        marginBottom: 8,
        alignSelf: 'center',
        borderRadius: '8',
    },
    availableItem: {
        width: 250,
        height: 190,
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