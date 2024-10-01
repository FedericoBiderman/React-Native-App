import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CompanyNameEntryScreen = () => {
  const [companyName, setCompanyName] = useState('');
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  }, []);

  const handleContinue = () => {
    navigation.navigate('TipoEmpresaScreen', { companyName });
  };

  const handleSkip = () => {
    navigation.navigate('TipoEmpresaScreen');
  };

  const handleGoHome = () => {
    navigation.navigate('HomeScreen');
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '0%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Omitir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill, 
                  { width: progressWidth }
                ]} 
              />
            </View>
          </View>
          <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.title}>Tu Empresa, Tu Orgullo</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Escribe el nombre de tu empresa"
                placeholderTextColor="#A0A0A0"
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>
            <Text style={styles.description}>Así es como tu empresa será reconocida</Text>
          </Animated.View>

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
              <Text style={styles.goHomeButtonText}>Volver al inicio y continuar después</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  skipText: {
    fontSize: 16,
    color: 'white',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: width * 0.7,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    fontSize: 18,
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 24,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(76, 175, 80, 0.5)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goHomeButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  goHomeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompanyNameEntryScreen;