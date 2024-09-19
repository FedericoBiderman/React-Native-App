import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BirthdayPhoneScreen = ({ route }) => {
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('GenderScreen', { ...route.params, birthday, phoneNumber });
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '20%' }]} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="When's your birthday? (dd/mm/yyyy)"
                value={birthday}
                onChangeText={setBirthday}
            />
            <TextInput
                style={styles.input}
                placeholder="What's your number?"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    }
});
export default BirthdayPhoneScreen;