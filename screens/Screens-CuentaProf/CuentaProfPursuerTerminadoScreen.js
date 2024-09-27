import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CuentaProfPursuerTerminadoScreen = () => {
  const navigation = useNavigation();


  const handleVistaPrevia = () => {
    navigation.navigate('ProfilePreviewPursuerScreen');
  };

  const handleHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cuenta Profesional Terminada</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.message}>
            Felicidades por haber terminado tu cuenta profesional, ¿quieres echarle una vista previa a tu perfil antes de poder navegar por la app?
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleVistaPrevia}>
            <Text style={styles.buttonText}>Vista Previa Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleHome}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  progressBar: {
    height: 25,
    backgroundColor: '#e0e0e0',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 160,
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: 160,
    backgroundColor: '#4CAF50',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#FF3B30',
  },
});

export default CuentaProfPursuerTerminadoScreen;