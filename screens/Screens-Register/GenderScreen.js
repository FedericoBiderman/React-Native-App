import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const GenderScreen = ({ route }) => {
  const [genderList, setGenderList] = useState([]);
  const [genderId, setGenderId] = useState(null);
  const [genderLabel, setGenderLabel] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));
  const baseUrl = 'https://properly-definite-mastodon.ngrok-free.app';

  useEffect(() => {
    // Fetch genders from API
    axios.get(`${baseUrl}/api/user/gender`)
      .then(response => setGenderList(response.data))
      .catch(error => console.error('Error fetching genders:', error));
    
    // Run animations
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

  const handleGenderSelect = (id, label) => {
    setGenderId(id);  // Save the selected gender ID
    setGenderLabel(label);  // Display the selected gender label
    setIsDropdownVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('EmailPasswordScreen', { ...route.params, genderId });
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
    outputRange: ['20%', '40%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EmailPasswordScreen')}>
          <Text style={styles.skipText}>Omitir</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>

      <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
        <Text style={styles.title}>¿Cuál es tu género?</Text>
        <TouchableOpacity 
          style={styles.genderButton}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <Text style={genderLabel ? styles.selectedText : styles.placeholderText}>
            {genderLabel || "Selecciona tu género"}
          </Text>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={genderList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleGenderSelect(item.id, item.label)}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <Text style={styles.infoText}>
          Express yourself freely! We believe in inclusivity and want to understand you better. Your gender helps us personalize your experience and provide relevant content. Remember, you're in control - choose the option that best represents you or prefer not to say.
        </Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>
            Do you already have an account? <Text style={styles.loginHighlight}>Log in</Text>
          </Text>
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
    height: 8,
    backgroundColor: '#e0e0e0',
    width: width * 0.7,
    borderRadius: 4,
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
  genderButton: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
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
  dropdown: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0089FF',
  },
  dropdownItemText: {
    color: 'black',
    fontSize: 16,
  },
  infoText: {
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 20,
    flex: 0.6,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#333',
  },
  loginHighlight: {
    color: '#007AFF',
  },
});

export default GenderScreen;
