import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CompanyNameEntryScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');

  const handleContinue = () => {
    navigation.navigate('NextScreen', { companyName });
  };

  const handleSkip = () => {
    navigation.navigate('NextScreen');
  };

  const handleGoHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Tu Empresa, Tu Orgullo</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe el nombre de tu empresa"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <Text style={styles.subtitle}>Así es como tu empresa será reconocida</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.continueButton, !companyName && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!companyName}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.goHomeButton}
            onPress={handleGoHome}
          >
            <Text style={styles.buttonText}>Go home, continue later</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Added to move the header down a bit
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  skipButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 20, // Added to move buttons up a bit
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10, // Space between buttons
  },
  continueButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goHomeButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    width: 250,
    alignItems: 'center',
  },
});

export default CompanyNameEntryScreen;