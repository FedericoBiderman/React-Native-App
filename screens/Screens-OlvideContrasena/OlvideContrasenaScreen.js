import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

const OlvideContrasenaScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSendCode = () => {
    if (!email) {
      setError("Por favor ingresa tu email.");
      return;
    }
    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido.");
      return;
    }
    setError("");
    navigation.navigate("OlvideContrasenaScreen2");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Forgot my password</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="john@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor="#999"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
          <Text style={styles.buttonText}>Send code</Text>
        </TouchableOpacity>
        <Text style={styles.info}>
          This will be a code that will arrive in your email that will have 6 digits. 
          You may want to open your "Spam" folder to find the email we will be sending you.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    marginTop: 20,
    color: "#666",
    textAlign: "center",
  },
});

export default OlvideContrasenaScreen;