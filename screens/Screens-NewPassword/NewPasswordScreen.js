import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const isValidPassword = () => {
    const hasMinLength = newPassword.length >= 8;
    const hasNumber = /[0-9]/.test(newPassword);
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    return hasMinLength && hasNumber && hasUppercase && hasSpecialChar;
  };

  const isMatch = () => newPassword === repeatPassword;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password cannot match the ones used in the last year.
        </Text>

        <View style={styles.logoContainer}>
          <Image source={require('./../../assets/icon.png')} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New password"
            secureTextEntry={secureTextEntry}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Repeat password"
            secureTextEntry={secureTextEntry}
            onChangeText={setRepeatPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.validationContainer}>
          <Text style={[styles.validationText, { color: isValidPassword() ? 'green' : 'red' }]}>
            {isValidPassword() ? (
              <Ionicons name="checkmark-circle" size={14} color="green" />
            ) : (
              <Ionicons name="close-circle" size={14} color="red" />
            )}
            At least 8 characters.
          </Text>
          <Text style={[styles.validationText, { color: /[0-9]/.test(newPassword) ? 'green' : 'red' }]}>
            {/[0-9]/.test(newPassword) ? (
              <Ionicons name="checkmark-circle" size={14} color="green" />
            ) : (
              <Ionicons name="close-circle" size={14} color="red" />
            )}
            At least one number.
          </Text>
          <Text style={[styles.validationText, { color: /[A-Z]/.test(newPassword) ? 'green' : 'red' }]}>
            {/[A-Z]/.test(newPassword) ? (
              <Ionicons name="checkmark-circle" size={14} color="green" />
            ) : (
              <Ionicons name="close-circle" size={14} color="red" />
            )}
            At least one uppercase letter.
          </Text>
          <Text style={[styles.validationText, { color: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'green' : 'red' }]}>
            {/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? (
              <Ionicons name="checkmark-circle" size={14} color="green" />
            ) : (
              <Ionicons name="close-circle" size={14} color="red" />
            )}
            At least one special character.
          </Text>
          <Text style={[styles.validationText, { color: isMatch() ? 'green' : 'red' }]}>
            {isMatch() ? (
              <Ionicons name="checkmark-circle" size={14} color="green" />
            ) : (
              <Ionicons name="close-circle" size={14} color="red" />
            )}
            Passwords match.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { opacity: isValidPassword() && isMatch() ? 1 : 0.5 }]}
          onPress={() => {
            if (isValidPassword() && isMatch()) {
              navigation.navigate('VolverInicioSesionScreen');
            } else {
              Alert.alert('Error', 'Please meet all password requirements.');
            }
          }}
          disabled={!isValidPassword() || !isMatch()}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    paddingRight: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  validationContainer: {
    marginBottom: 20,
  },
  validationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0065D0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPasswordScreen;
