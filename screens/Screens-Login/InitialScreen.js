import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Para navegar entre pantallas
import { FontAwesome } from "@expo/vector-icons"; // Iconos de redes sociales

const InitialScreen = () => {
  const navigation = useNavigation(); // Hook para la navegación

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./../../assets/icon.png')} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LoginScreen")} >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.signupText}>Sign up free</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={30} color="#db4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "30%",
    backgroundColor: "#fbbd08",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: 40,
    marginTop: 80,
  },
  logo: {
    width: 80,
    height: 80,
  },
  loginButton: {
    backgroundColor: "#007aff",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007aff",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    color: "#007aff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    color: "gray",
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  socialButton: {
    marginHorizontal: 15,
  },
});

export default InitialScreen;
