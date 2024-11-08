import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const baseUrl = 'https://welcome-chamois-aware.ngrok-free.app';

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

  const validateName = (firstName, lastName, field) => {
    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    if (!firstName) {
      setErrors(prev => ({ ...prev, [field]: 'Este campo es requerido' }));
      return false;
    }
    if (!nameRegex.test(lastName)) {
      setErrors(prev => ({ ...prev, [field]: 'Debe comenzar con mayúscula y contener solo letras' }));
      return false;
    }
    setErrors(prev => ({ ...prev, [field]: '' }));
    return true;
  };

  const validateUsername = (username) => {
    // Nueva expresión regular que permite letras, números y caracteres especiales
    const usernameRegex = /^[a-zA-Z@][a-zA-Z0-9@._,-]*$/;
  
    if (!username) {
      setErrors(prev => ({ ...prev, username: 'El nombre de usuario es requerido' }));
      return false;
    }
    if (!usernameRegex.test(username)) {
      setErrors(prev => ({ ...prev, username: 'Debe comenzar con una letra o @ y puede contener letras, números y caracteres especiales' }));
      return false;
    }
    setErrors(prev => ({ ...prev, username: '' }));
    return true;
  };

  const handleRegister = async () => {
    const isFirstNameValid = validateName(firstName, 'firstName');
    const isLastNameValid = validateName(lastName, 'lastName');
    const isUsernameValid = validateUsername(username);

    if (!isFirstNameValid || !isLastNameValid || !isUsernameValid) {
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/user/register`, {
        Name: firstName,
        Surname: lastName,
        username: username
      });

      if (response.data.success) {
        Alert.alert(
          'Muy bien',
          'sigue creando tu cuenta.',
          [
            { 
              text: 'OK', 
              onPress: () => handleContinue()
            }
          ]
        );
      }
    } catch (error) {
      let errorMessage = 'Hubo un problema al intentar registrarte.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const handleContinue = () => {
    const isFirstNameValid = validateName(firstName, 'firstName');
    const isLastNameValid = validateName(lastName, 'lastName');
    const isUsernameValid = validateUsername(username);

    if (isFirstNameValid && isLastNameValid && isUsernameValid) {
      navigation.navigate('BirthdayPhoneScreen', { firstName, lastName, username });
    }
  };

  const handleInputChange = (text, setter, field) => {
    if (field === 'username') {
      // Permite letras, números y caracteres especiales para el username
      const validChars = text.replace(/[^a-zA-Z0-9@._,-]/g, '');
      setter(validChars);
      validateUsername(validChars);
    } else {
      // Mantiene solo letras para firstName y lastName
      const lettersOnly = text.replace(/[^a-zA-Z]/g, '');
      setter(lettersOnly);
      validateName(lettersOnly, field);
    }
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '0%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BirthdayPhoneScreen')}>
          <Text style={styles.skipText}>Omitir</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>

      <ScrollView>
        <Animated.View style={[styles.formContainer, { opacity, transform: [{ translateY }] }]}>
          <Text style={styles.title}>Create your account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.firstName ? styles.inputError : null]}
              placeholder="What's your first name?"
              value={firstName}
              onChangeText={(text) => handleInputChange(text, setFirstName, 'firstName')}
              placeholderTextColor="#999"
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.lastName ? styles.inputError : null]}
              placeholder="What's your last name?"
              value={lastName}
              onChangeText={(text) => handleInputChange(text, setLastName, 'lastName')}
              placeholderTextColor="#999"
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.username ? styles.inputError : null]}
              placeholder="Create a username or enter your company name"
              value={username}
              onChangeText={(text) => handleInputChange(text, setUsername, 'username')}
              placeholderTextColor="#999"
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
          </View>

          <Text style={styles.infoText}>
            Let's start by entering our personal information such as first, last name and username. Your username is unique, and if you regret it you can change it.
          </Text>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              (!firstName || !lastName || !username) && styles.continueButtonDisabled
            ]} 
            onPress={handleRegister}
            disabled={!firstName || !lastName || !username}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginText}>
              Do you already have an account? <Text style={styles.loginHighlight}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
  },
  infoText: {
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#333',
  },
  loginHighlight: {
    color: '#007AFF',
  },
});

export default RegisterScreen;