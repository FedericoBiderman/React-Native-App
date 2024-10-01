import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const empresaTypes = [
  'Multinacional',
  'PyMe',
  'Trasnacional',
  'Empresa familiar',
  'Sociedad Laboral',
  'Cooperativa de Consumidores',
  'Startup'
];

const TipoEmpresaScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
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

  const filteredTypes = empresaTypes.filter(type => 
    type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectType = (type) => {
    setSelectedType(type);
    setModalVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('EspecializacionEmpresaScreen', { empresaType: selectedType });
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
    outputRange: ['0%', '16.67%'],
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
          <TouchableOpacity onPress={() => navigation.navigate('EspecializacionEmpresaScreen')}>
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
          <Text style={styles.title}>Tipo de empresa</Text>
          
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={selectedType ? styles.selectedText : styles.placeholderText}>
              {selectedType || 'Indica el tipo de empresa que tienes'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            Así es como los clientes y empleados potenciales te identificarán.
          </Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.continueButton, !selectedType && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedType}
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
                <Text style={styles.modalTitle}>Indica el tipo de empresa que tienes</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor="#A0A0A0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <FlatList
                data={filteredTypes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => handleSelectType(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
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
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TipoEmpresaScreen;