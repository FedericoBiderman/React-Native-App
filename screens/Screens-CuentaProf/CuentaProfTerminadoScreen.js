import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CuentaProfPickerTerminadoScreen = () => {
  const navigation = useNavigation();

  const handleVistaPrevia = () => {
    // Navegar a la pantalla de vista previa del perfil
    navigation.navigate('VistaPreviewPerfilScreen');
  };

  const handleHome = () => {
    // Navegar a la pantalla de inicio
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cuenta Profesional Terminada.</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.title}>
          Felicidades por haber terminado tu cuenta profesional, ¿quieres echarle una vista previa a tu perfil antes de poder navegar por la app?
        </Text>

        <TouchableOpacity style={styles.vistaPreviaButton} onPress={handleVistaPrevia}>
          <Text style={styles.vistaPreviaButtonText}>Vista Previa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  progressBar: {
    height: 25,
    backgroundColor: '#e0e0e0',
    marginLeft: 120,
    width: 160,
    marginBottom: 20,
    borderRadius: 30,
  },
  progressFill: {
    height: '100%',
    borderRadius: 30,
    width: 160,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  vistaPreviaButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  vistaPreviaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CuentaProfPickerTerminadoScreen;