import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const formacionOptions = [
  'Si',
  'No',
  'Estoy estudiando',
  'No fui a la universidad',
];

const FormacionAcademicaScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFormacion, setSelectedFormacion] = useState('');

  const handleSelectFormacion = (formacion) => {
    setSelectedFormacion(formacion);
    setModalVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('TrayectoriaAcademicaScreen', { formacionAcademica: selectedFormacion });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TrayectoriaAcademicaScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '33.33%' }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>¿Cuál es tu Formación Académica?</Text>
        
        <TouchableOpacity 
          style={styles.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={selectedFormacion ? styles.selectedText : styles.placeholderText}>
            {selectedFormacion || '¿Tienes un título de grado o posgrado?'}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#888" />
        </TouchableOpacity>

        <Text style={styles.description}>
          Así demostrarás tu nivel educativo.
        </Text>

        <TouchableOpacity 
          style={[styles.continueButton, !selectedFormacion && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedFormacion}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.goHomeButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.goHomeButtonText}>Go home, continue later</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>¿Tienes un título de grado o posgrado?</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={formacionOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelectFormacion(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  skipText: {
    fontSize: 16,
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  placeholderText: {
    color: '#888',
  },
  selectedText: {
    color: 'black',
  },
  description: {
    color: '#666',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  goHomeButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  goHomeButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default FormacionAcademicaScreen;