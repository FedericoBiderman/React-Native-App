import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  const baseUrl = 'https://properly-definite-mastodon.ngrok-free.app';

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        username,
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="gray" />
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
        />
      </View>
  
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
  
      <TouchableOpacity onPress={() => navigation.navigate('OlvideContrasenaScreen')}>
        <Text style={styles.forgotPasswordText}>Forgot my password?</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={handleLogin}>Log in</Text>
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
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#7a7a7a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  icon: {
    padding: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 5,
    fontSize: 16,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#007AFF",
    left: 235
  },
  loginButton: {
    backgroundColor: "#0043F9",
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
  },
  createAccountText: {
    fontSize: 16,
    color: "#007AFF",
  },
});