import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function VolverInicioSesionScreen() {
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        style={styles.backIcon}
        onPress={() => console.log('Go Back')}
      />

      <View style={styles.content}>
        <Image source={require('./../../assets/icon.png')} style={styles.logo} />

        <Ionicons name="checkmark-circle" size={64} color="#10B981" style={styles.successIcon} />

        <Text style={styles.title}>Password was updated</Text>
        <Text style={styles.subtitle}>Log in again using your new password</Text>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  backIcon: {
    marginTop: 20,
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  successIcon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonText: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});