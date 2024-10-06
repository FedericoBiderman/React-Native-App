import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const ageRanges = [
  { id: '1', range: '15-18'},
  { id: '2', range: '19-22' },
  { id: '3', range: '23-26' },
  { id: '4', range: '27-30' },
  { id: '5', range: '+30' },
  { id: '6', range: '40-60' },
  { id: '7', range: 'any age'},
];

const PublicoObjetivoEmpresaScreen = ({ route }) => {
  const [selectedRange, setSelectedRange] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
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

  const handleSelectRange = (range) => {
    setSelectedRange(range);
    setIsDropdownVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('CuentaProfPickerTerminadoScreen', { ...route.params, ageRange: selectedRange });
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
    outputRange: ['66.67%', '83.33%'],
  });

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="dark" />
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CuentaProfPickerTerminadoScreen')}>
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
          <Text style={styles.title}>Público Objetivo</Text>
          <Text style={styles.description}>
            Así entenderán a quiénes buscas atraer.
          </Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            <Text style={selectedRange ? styles.selectedText : styles.placeholderText}>
              {selectedRange || '¿Qué rango etario está buscando tu empresa?'}
            </Text>
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdown}>
              <FlatList
                data={ageRanges}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelectRange(item.range)}
                  >
                    <Text style={styles.dropdownItemText}>{item.range} {item.icon}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.continueButton, !selectedRange && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedRange}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: 'black',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  placeholderText: {
    color: '#A0A0A0',
    fontSize: 18,
  },
  selectedText: {
    color: 'black',
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.82,
    width: '100%',
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goHomeButton: {
    borderColor: '#007AFF',
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  goHomeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#0089FF',
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PublicoObjetivoEmpresaScreen;