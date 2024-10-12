import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const ModalComponent = ({selectedPc, modalVisible, closeModal, navigation}) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{selectedPc.Statut}</Text>
                    {selectedPc.Propriétaire ? (
                        <Text style={styles.modalDetails}>
                            <MaterialIcons name="person" size={16} color="black"/>{' '}
                            Propriétaire: {selectedPc.Propriétaire.split(' ')[0]}
                        </Text>
                    ) : (
                        <Text style={styles.modalDetails}>
                            <MaterialIcons name="person-outline" size={16} color="grey"/> Aucun propriétaire
                        </Text>
                    )}
                    <Text style={styles.modalDetails}>
                        <MaterialIcons name="info-outline" size={16} color="black"/> SN: {selectedPc.SN}
                    </Text>
                    <Text style={styles.modalDetails}>
                        <MaterialIcons name="laptop" size={16} color="black"/> Modèle: {selectedPc.Modèle}
                    </Text>
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
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        width: '85%',
        padding: 25,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalDetails: {
        fontSize: 16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ModalComponent;