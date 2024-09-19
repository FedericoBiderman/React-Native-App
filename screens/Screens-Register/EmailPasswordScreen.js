import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmailPasswordScreen = ({ route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('DNIScreen', { ...route.params, email, password });
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="What's your full address?"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="What's your password?"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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
export default EmailPasswordScreen;