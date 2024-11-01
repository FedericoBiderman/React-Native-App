import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const { width } = Dimensions.get('window');

const EmailPasswordScreen = ({ route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [animation] = useState(new Animated.Value(0));
    const [progressAnimation] = useState(new Animated.Value(0));
    const navigation = useNavigation();
    const baseUrl = 'https://properly-definite-mastodon.ngrok-free.app';

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(progressAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            })
        ]).start();
    }, []);

    const isValidPassword = () => {
        const hasMinLength = password.length >= 8;
        const hasNumber = /[0-9]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasMinLength && hasNumber && hasUppercase && hasSpecialChar;
    };

    const isMatch = () => password === repeatPassword;

    const handleContinue = async () => {
        if (!isValidPassword() || !isMatch()) {
            Alert.alert('Error', 'Please meet all password requirements.');
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/api/user/register`, {
                email,
                password,
            });
            if (response.data.success) {
                Alert.alert('Registro Exitoso', 'Tu cuenta ha sido creada correctamente.', [
                    { text: 'OK', onPress: () => navigation.navigate('DNIScreen', { ...route.params, email, password }) },
                ]);
            } else {
                Alert.alert('Error', 'Hubo un problema al crear la cuenta.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un problema al intentar registrarte.');
        }
    };

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DNIScreen')}>
                    <Text style={styles.skipText}>Omitir</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create an email and password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="What's your email address?"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholderTextColor="#999"
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureTextEntry}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.validationContainer}>
                        <Text style={[styles.validationText, { color: isValidPassword() ? 'green' : 'red' }]}>At least 8 characters.</Text>
                        <Text style={[styles.validationText, { color: /[0-9]/.test(password) ? 'green' : 'red' }]}>At least one number.</Text>
                        <Text style={[styles.validationText, { color: /[A-Z]/.test(password) ? 'green' : 'red' }]}>At least one uppercase letter.</Text>
                        <Text style={[styles.validationText, { color: /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'green' : 'red' }]}>At least one special character.</Text>
                    </View>
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    skipText: {
        fontSize: 16,
        color: 'black',
    },
    progressBarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        width: width * 0.7,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
    formContainer: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    continueButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginHighlight: {
        color: "#007AFF",
    },
    loginText: {
        marginTop: 20,
        textAlign: "center",
        color: "#333",
    },
    infoText: {
        marginBottom: 20,
        color: "#666",
        textAlign: "center",
    },
});

export default EmailPasswordScreen;
