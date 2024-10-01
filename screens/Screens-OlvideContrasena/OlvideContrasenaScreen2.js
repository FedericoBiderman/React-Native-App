import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const OlvideContrasenaScreen2 = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const navigation = useNavigation();
  const inputRefs = useRef([]);

  const handleValidateCode = () => {
    // Lógica para validar el código aquí
    const codeString = code.join("");
    if (codeString.length < 6) {
      Alert.alert("Por favor completa todos los campos.");
      return;
    }
    navigation.navigate("NewPasswordScreen");
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Moverse al siguiente campo automáticamente
    if (text && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Validate Email</Text>
      <Text style={styles.info}>Check your email and enter the code</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            ref={(ref) => (inputRefs.current[index] = ref)} // Guardar referencia del input
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleValidateCode}>
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
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
  info: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    width: 40,
    height: 50,
    fontSize: 20,
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
});

export default OlvideContrasenaScreen2;
