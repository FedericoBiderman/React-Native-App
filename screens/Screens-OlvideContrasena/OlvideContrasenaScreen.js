import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const OlvideContrasenaScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSendCode = () => {
    // Lógica para enviar el código aquí
    if (!email) {
      Alert.alert("Por favor ingresa tu email.");
      return;
    }
    navigation.navigate("OlvideContrasenaScreen2");
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Forgot my password</Text>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="john@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#b0b0b0"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send code</Text>
      </TouchableOpacity>
      <Text style={styles.info}>
        This will be a code that will arrive in your email that will have 6 digits.
        You may want to open your "Spam" folder to find the email we will be sending you.
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: "#fff",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    marginTop: 10,
    color: "#fff",
    textAlign: "center",
  },
});

export default OlvideContrasenaScreen;
