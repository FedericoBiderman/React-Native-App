import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const InitialScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('./../../assets/icon.png')} style={styles.logo} />
      </View>

      {/* Botones de Login y Signup */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.signupText}>Sign up free</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      {/* Botones sociales */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.iconCircle}>
            <FontAwesome name="facebook" size={24} color="#3b5998" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.googleIconCircle}>
            <View style={styles.colorQuadrant1} />
            <View style={styles.colorQuadrant2} />
            <View style={styles.colorQuadrant3} />
            <View style={styles.colorQuadrant4} />
            <FontAwesome name="google" size={24} color="white" style={styles.googleIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.iconCircle}>
            <FontAwesome name="apple" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 40,
    marginTop: 80,
  },
  loginButton: {
    backgroundColor: '#007aff',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007aff',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#007aff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialButton: {
    marginHorizontal: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  colorQuadrant1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: '#4285F4', // Google Blue
  },
  colorQuadrant2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: '#DB4437', // Google Red
  },
  colorQuadrant3: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: '#F4B400', // Google Yellow
  },
  colorQuadrant4: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: '#0F9D58', // Google Green
  },
  googleIcon: {
    position: 'absolute',
    top: 13,
    left: 13,
  },
});

export default InitialScreen;
