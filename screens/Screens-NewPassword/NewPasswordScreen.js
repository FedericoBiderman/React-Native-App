import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create new password</Text>
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
        <Text style={[styles.validationText, styles.errorText]}>At least 8 characters.</Text>
        <Text style={[styles.validationText, styles.errorText]}>At least one number.</Text>
        <Text style={[styles.validationText, styles.errorText]}>The password must contain at least one uppercase letter.</Text>
        <Text style={[styles.validationText, styles.errorText]}>The password must contain at least one special character.</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('VolverInicioSesionScreen')}>
        <Text style={styles.buttonText}>Change password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
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
  },
  validationContainer: {
    marginBottom: 20,
  },
  validationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  errorText: {
    color: 'black',
  },
  buttonText: {
    backgroundColor: '#0065D0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFF',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 25,
    height: 25,
  }
});