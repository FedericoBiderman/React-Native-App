import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const countries = [
  { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { id: 'fr', name: 'Francia', flag: '🇫🇷' },
  { id: 'br', name: 'Brazil', flag: '🇧🇷' },
  { id: 'us', name: 'Estados Unidos', flag: '🇺🇸' },
  { id: 'de', name: 'Alemania', flag: '🇩🇪' },
  { id: 'es', name: 'España', flag: '🇪🇸' },
];

const UbicacionGlobalScreen = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = (country) => {
    setSelectedCountry(country.name);
    setModalVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('ImpactoLocalEmpresaScreen', { country: selectedCountry });
  };

  const handleGoHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ImpactoLocalEmpresaScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '50%' }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Ubicación Global.</Text>
        
        <TouchableOpacity 
          style={styles.inputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={selectedCountry ? styles.selectedText : styles.placeholderText}>
            {selectedCountry || '¿En qué país resides actualmente?'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Muestra tu presencia.
        </Text>

        <TouchableOpacity 
          style={[styles.continueButton, !selectedCountry && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedCountry}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.goHomeButton} onPress={handleGoHome}>
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
              <Text style={styles.modalTitle}>¿En qué país resides actualmente?</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleSelectCountry(item)}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.flag}</Text>
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
        color: 'black',
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
      inputContainer: {
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
      searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
      },
      optionItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      continueButtonDisabled: {
        backgroundColor: '#A0A0A0',
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
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default UbicacionGlobalScreen;