import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfilePreviewPickerScreen = () => {
  const navigation = useNavigation();
  

  const profileCompletion = 75; // Ejemplo de porcentaje de compleción
  
  const profileData = {
    imageUrl: require('../../assets/profile2.png'),
    name: 'John Doe',
    last_name: 'Smith',
    nombreEmpresa: 'IBM',
    surname: 'JoSmiDo',
    UbicacionEmpresa: 'Argentina',
    PublicoObjetivo: '19-23 years old',
    UbicacionLocal: 'Villa Crespo',
    empresaType: 'Startup',
    especializacionEmpresa: 'Nanotecnologia',
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        {renderProfileItem('Nombre de la empresa', profileData.nombreEmpresa, !!profileData.nombreEmpresa)}
        {renderProfileItem('Nombre de Usuario', profileData.surname, !!profileData.surname)}
        {renderProfileItem('Ubicacion Global de la empresa', profileData.UbicacionEmpresa, !!profileData.UbicacionEmpresa)}
        {renderProfileItem('Ubicacion Local de la empresa', profileData.UbicacionLocal, !!profileData.UbicacionLocal)}
        {renderProfileItem('Publico Objetivo de la empresa', profileData.PublicoObjetivo, !!profileData.PublicoObjetivo)}
        {renderProfileItem('Tipo de empresa', profileData.empresaType, !!profileData.empresaType)}
        {renderProfileItem('Especializacion de la empresa', profileData.especializacionEmpresa, !!profileData.especializacionEmpresa)}

        {profileCompletion === 100 ? (
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.buttonText}>Ir a la Home</Text>
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
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('PickerProfileScreen')}
            >
              <Text style={styles.buttonText}>Ver Perfil</Text>
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
      backgroundColor: '#F5F5F5',
    },
    scrollContent: {
      paddingBottom: 20,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginVertical: 30,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 3,
      borderColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    completionOverlay: {
      position: 'absolute',
      bottom: -10,
      backgroundColor: '#FF4081',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    completionText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    profileItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      backgroundColor: 'white',
    },
    itemLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    itemValueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemValue: {
      fontSize: 16,
      marginRight: 10,
      color: '#666',
    },
    completeButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    homeButton: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ProfilePreviewPickerScreen;


/*


  }; */