import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const universitiesTypes = [
  { id: 'ucla', name: 'University of California, Los Angeles', country: 'Estados Unidos', flag: '🇺🇸'},
  { id: 'uclan', name: 'University of Central Lancashire', country: 'Reino Unido', flag: '🇬🇧'},
  { id: 'uba', name: 'Universidad de Buenos Aires', country: 'Argentina', flag: '🇦🇷' },
  { id: 'mit', name: 'Massachusetts Institute of Technology', country: 'Estados Unidos', flag: '🇺🇸' },
  { id: 'stanford', name: 'Stanford University', country: 'Estados Unidos', flag: '🇺🇸' },
  { id: 'cambridge', name: 'University of Cambridge', country: 'Reino Unido', flag: '🇬🇧' },
  { id: 'usp', name: 'University of Sao Paulo', country: 'Brasil', flag: '🇧🇷' },
  { id: 'pucchile', name: 'Pontifical Catholic University of Chile', country: 'Chile', flag: '🇨🇱' },
];

const TrayectoriaAcademicaScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredUniversities = universitiesTypes.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.country.toLowerCase().includes(searchQuery.toLowerCase())
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
    outputRange: ['33.33%', '50%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UbicacionGlobalScreen')}>
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
          <Text style={styles.title}>Tu Trayectoria Académica</Text>
          
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={selectedUniversity ? styles.selectedText : styles.placeholderText}>
              {selectedUniversity || 'Describe tu formación académica'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            Destaca tus logros y conocimientos.
          </Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.continueButton, !selectedUniversity && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedUniversity}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Describe tu formación académica</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Buscar universidad o país..."
                placeholderTextColor="#A0A0A0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <FlatList
                data={filteredUniversities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.universityItem}
                    onPress={() => handleSelectUniversity(item)}
                  >
                    <View>
                      <Text style={styles.universityText}>{item.name}</Text>
                      <Text style={styles.countryText}>{item.country}</Text>
                    </View>
                    <Text style={styles.flagText}>{item.flag}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
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
    padding: 16,
    marginBottom: 16,
  },
  placeholderText: {
    color: '#A0A0A0',
    fontSize: 18,
  },
  selectedText: {
    color: 'white',
    fontSize: 18,
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
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  goHomeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#3b5998',
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
    color: 'white',
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'white',
  },
  universityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  universityText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countryText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  flagText: {
    fontSize: 24,
  },
});

export default TrayectoriaAcademicaScreen;