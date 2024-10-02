import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const skillsTypes = [
  { id: '1', name: 'JavaScript', icon: 'js' },
  { id: '2', name: 'React', icon: 'react' },
  { id: '3', name: 'React Native', icon: 'react' },
  { id: '4', name: 'Node.js', icon: 'node-js' },
  { id: '5', name: 'CSS', icon: 'css3-alt' },
  { id: '6', name: 'Python', icon: 'python' },
  { id: '7', name: 'Java', icon: 'java' },
  { id: '8', name: 'HTML', icon: 'html5' },
  { id: '9', name: 'PHP', icon: 'php' },
  { id: '10', name: 'Swift', icon: 'swift' },
];

const HabilidadesScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
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

  const filteredSkills = skillsTypes.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSkill = (skill) => {
    setSelectedSkills(prevSkills => {
      if (prevSkills.some(s => s.id === skill.id)) {
        return prevSkills.filter(s => s.id !== skill.id);
      } else {
        return [...prevSkills, skill];
      }
    });
  };

  const handleContinue = () => {
    navigation.navigate('CuentaProfPursuerTerminadoScreen', { skills: selectedSkills });
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
      <StatusBar style="light" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CuentaProfTerminadoScreen')}>
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
          <Text style={styles.title}>Tus Habilidades</Text>
          
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={selectedSkills.length > 0 ? styles.selectedText : styles.placeholderText}>
              {selectedSkills.length > 0 ? selectedSkills.map(skill => skill.name).join(', ') : 'Describe tus habilidades clave.'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            Así es como los empleadores verán lo que puedes aportar.
          </Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.continueButton, selectedSkills.length === 0 && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={selectedSkills.length === 0}
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
                <Text style={styles.modalTitle}>Selecciona tus habilidades</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Buscar habilidades..."
                placeholderTextColor="#A0A0A0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <FlatList
                data={filteredSkills}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.skillItem,
                      selectedSkills.some(s => s.id === item.id) && styles.selectedSkillItem
                    ]}
                    onPress={() => handleSelectSkill(item)}
                  >
                    <FontAwesome5 name={item.icon} size={24} color="white" style={styles.skillIcon} />
                    <Text style={styles.skillText}>{item.name}</Text>
                    {selectedSkills.some(s => s.id === item.id) && (
                      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.checkIcon} />
                    )}
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
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  selectedSkillItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  skillIcon: {
    marginRight: 16,
  },
  skillText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
});

export default HabilidadesScreen;