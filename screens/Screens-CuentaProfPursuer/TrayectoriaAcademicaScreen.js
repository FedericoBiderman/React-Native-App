import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const universitiesTypes = [
  { name: 'University of California, Los Angeles', country: '🇺🇸', flag: '🇺🇸'},
  { name: 'University of Central Lancashire', country: '🇬🇧', flag: '🇬🇧'},
  { name: 'Universidad de Buenos Aires', country: '🇦🇷', flag: '🇦🇷' },
  { name: 'Massachusetts Institute of Technology', country: '🇺🇸', flag: '🇺🇸' },
  { name: 'University of Stanford', country: '🇺🇸', flag: '🇺🇸' },
  { name: 'University of Cambridge', country: '🇬🇧', flag: '🇬🇧' },
  { name: 'University of Sao Paulo', country: '🇧🇷', flag: '🇧🇷' },
  { name: 'Pontifical Catholic University of Chile', country: '🇨🇱', flag: '🇨🇱' },
];

const TrayectoriaAcademicaScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = universitiesTypes.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university.name);
    setModalVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('UbicacionGlobalScreen', { selectedUniversity });
  };

  const handleGoHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '33.33%' }]} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Tu Trayectoria Académica.</Text>
        <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={selectedUniversity ? styles.inputText : styles.placeholderText}>
            {selectedUniversity || 'Describe tu formación académica'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Destaca tus logros y conocimientos.</Text>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goHomeButton} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Go home, continue later</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Describe tu formación académica</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar universidad"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredUniversities}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.universityItem}
                onPress={() => handleSelectUniversity(item)}
              >
                <Text>{item.name}</Text>
                <Text>{item.flag}</Text>
              </TouchableOpacity>
            )}
          />
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
    color: '#007AFF',
    fontSize: 16,
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  inputText: {
    color: 'black',
  },
  placeholderText: {
    color: '#999',
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  goHomeButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  universityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default TrayectoriaAcademicaScreen;