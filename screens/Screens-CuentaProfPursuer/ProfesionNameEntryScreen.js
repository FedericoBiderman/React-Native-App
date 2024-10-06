import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Animated, Dimensions, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const ProfesionNameEntryScreen = () => {
  const [profesionName, setProfesionName] = useState('');
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Cuando el teclado está visible
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Cuando el teclado se oculta
      }
    );

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

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleContinue = () => {
    navigation.navigate('EspecializacionProfesionScreen', { profesionName });
  };

  const handleSkip = () => {
    navigation.navigate('EspecializacionProfesionScreen');
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
      <StatusBar style="dark" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Omitir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[styles.progressFill, { width: progressWidth }]} 
              />
            </View>
          </View>
          <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.title}>Tu Profesión, Tu Orgullo</Text>
            <Text style={styles.description}>Así es como destacarás en tu industria</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Escribe el rubro en el que trabajas"
                placeholderTextColor="#A0A0A0"
                value={profesionName}
                onChangeText={setProfesionName}
              />
            </View>
          </Animated.View>
          <View style={[
            styles.buttonContainer, 
            isKeyboardVisible && styles.buttonContainerKeyboardVisible // Ajuste cuando el teclado esté visible
          ]}>
            <TouchableOpacity 
              style={[styles.continueButton, !profesionName && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!profesionName}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.goHomeButton}
              onPress={handleGoHome}
            >
              <Text style={styles.goHomeButtonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>  
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco
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
    color: 'black', // Color negro para el texto de Omitir
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(100,100,100,0.3)',
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
    color: 'black', // Título en negro
    marginBottom: 10, // Reducir espacio con el subtítulo
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff', // Fondo del input ligeramente gris
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    padding: 16,
    fontSize: 18,
    color: 'black', // Color del texto de input en negro
  },
  description: {
    fontSize: 16,
    color: 'black', // Subtítulo en negro
    marginBottom: 20, // Margen reducido para estar justo debajo del título
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 4, // Ajustar la posición debajo del input
    width: '100%',
    paddingHorizontal: 24,
  },
  buttonContainerKeyboardVisible: {
    position: "absolute",
    bottom: 20, // Elevar botones cuando el teclado esté visible
  },
  continueButton: {
    backgroundColor: '#007AFF', // Botón azul
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#B0B0B0', // Botón deshabilitado en gris
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goHomeButton: {
    borderColor: '#007AFF', // Borde rojo
    borderWidth: 2, // Ancho del borde
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'transparent', // Fondo transparente
  },
  goHomeButtonText: {
    color: '#007AFF', // Texto rojo
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfesionNameEntryScreen;