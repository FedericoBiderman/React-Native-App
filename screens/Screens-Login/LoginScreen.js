import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [rememberMe, setRememberMe] = useState(false); // Estado para el checkbox
  const navigation = useNavigation();
  const baseUrl = 'https://welcome-chamois-aware.ngrok-free.app';

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        username: email, 
        password,
      });

      if (response.data.success) {
        Alert.alert('Login Exitoso', 'Has ingresado correctamente.', [
          { text: 'OK', onPress: () => navigation.replace('HomeScreen') },
        ]);
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión.');
    }
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="john@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#b0b0b0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#b0b0b0"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rememberForgotContainer}>
        {/* Checkbox de Remember me */}
        <TouchableOpacity onPress={toggleRememberMe} style={styles.checkboxContainer}>
          <Ionicons
            name={rememberMe ? "checkbox-outline" : "square-outline"}
            size={24}
            color="black"
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>

        {/* Enlace de Forgot password */}
        <TouchableOpacity onPress={() => navigation.navigate('OlvideContrasenaScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot my password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>You are new? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },

  input: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  inputWrapper: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  passwordInput: {
    flex: 1, // Ocupar el espacio disponible
    height: 50,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 16,
    color: "black",
  },
  createAccountText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
