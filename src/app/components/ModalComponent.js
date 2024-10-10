// ModalComponent.js
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

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
});

export default ModalComponent;