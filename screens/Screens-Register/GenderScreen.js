import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const GenderScreen = ({ route }) => {
    const [gender, setGender] = useState('');
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('EmailPasswordScreen', { ...route.params, gender });
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="What's your gender?" value="" />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Femenino" value="femenino" />
                <Picker.Item label="Otro" value="otro" />
                <Picker.Item label="Prefiero no decirlo" value="no_especificado" />
            </Picker>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles similar to previous screens, plus:
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 80,
        backgroundColor: '#fff',
    },
    progressBar: {
        height: 25,
        backgroundColor: '#e0e0e0',
        marginLeft: 120,
        width: 160,
        marginBottom: 20,
        borderRadius: 30,
    },
    progressFill: {
        height: '100%',
        borderRadius: 30,
        width: 160,
        backgroundColor: '#4CAF50',
    },
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    continueButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
    },
});

export default GenderScreen;