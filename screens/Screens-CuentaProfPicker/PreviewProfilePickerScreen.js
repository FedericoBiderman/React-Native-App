import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PreviewProfilePickerScreen = () => {
  const navigation = useNavigation();
  
  const profileCompletion = 75; // Ejemplo de porcentaje de compleción
  
  const profileData = {
    imageUrl: require('../../assets/profile2.png'),
    name: 'John Doe',
    last_name: 'Smith',
    age: '30',
    profession: 'Software Developer',
    education: 'Bachelor in Computer Science',
    experience: '5 years',
    skills: 'JavaScript, React Native, Node.js',
    empresaType: 'Startup',
    especializacion: 'Desarrollo de aplicaciones móviles',
  };

  const renderProfileItem = (label, value, isCompleted) => (
    <View style={styles.profileItem}>
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemValue}>{value || 'No completado'}</Text>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="close-circle" size={24} color="red" />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileImageContainer}>
        <Image source={require('./../../assets/profile2.png')}
            style={styles.profileImage}
          />
          <View style={styles.completionOverlay}>
            <Text style={styles.completionText}>{`${profileCompletion}% COMPLETE`}</Text>
          </View>
        </View>

        {renderProfileItem('Nombre', profileData.name, !!profileData.name)}
        {renderProfileItem('Apellido', profileData.last_name, !!profileData.last_name)}
        {renderProfileItem('Edad', profileData.age, !!profileData.age)}
        {renderProfileItem('Profesión', profileData.profession, !!profileData.profession)}
        {renderProfileItem('Educación', profileData.education, !!profileData.education)}
        {renderProfileItem('Experiencia', profileData.experience, !!profileData.experience)}
        {renderProfileItem('Habilidades', profileData.skills, !!profileData.skills)}

        {profileCompletion === 100 ? (
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.buttonText}>Ir al Inicio</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => navigation.navigate('TipoEmpresaScreen')}
            >
              <Text style={styles.buttonText}>Completar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Text style={styles.buttonText}>Ir a la home</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  completionOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF4081',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 153,
  },
  completionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 16,
    marginRight: 10,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  homeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreviewProfilePickerScreen;