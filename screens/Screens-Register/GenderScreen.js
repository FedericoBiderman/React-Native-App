import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GenderScreen = ({ route }) => {
    const [gender, setGender] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const genders = [
        { label: "Masculino", value: "masculino" },
        { label: "Femenino", value: "femenino" },
        { label: "Otro", value: "otro" },
        { label: "Prefiero no decirlo", value: "no_especificado" },
    ];

    const handleGenderSelect = (value) => {
        setGender(value);
        setModalVisible(false);
    };

    const handleContinue = () => {
        navigation.navigate('EmailPasswordScreen', { ...route.params, gender });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '40%' }]} />
            </View>

            <TouchableOpacity style={styles.genderButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.genderButtonText}>
                    {gender ? gender : "¿Cuál es tu género?"}
                </Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        data={genders}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => handleGenderSelect(item.value)}
                            >
                                <Text style={styles.modalItemText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 20,
      },
      progressFill: {
        height: '100%',
        borderRadius: 4,
        backgroundColor: '#4CAF50',
      },
    genderButton: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    genderButtonText: {
        color: '#555',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalItemText: {
        fontSize: 18,
    },
    closeButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GenderScreen;
