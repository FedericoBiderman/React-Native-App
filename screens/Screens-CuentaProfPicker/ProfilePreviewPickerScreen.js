import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const ProfilePreviewPickerScreen = () => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));

  const profileCompletion = 75; // Ejemplo de porcentaje de compleción
  
  const profileData = {
    imageUrl: require('../../assets/ibm.png'),
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
    outputRange: ['0%', `100%`],
  });

  const renderProfileItem = (label, value, isCompleted) => (
    <View style={styles.profileItem}>
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemValue}>{value || 'No completado'}</Text>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={24} color="#FF3B30" />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
            <View style={styles.profileImageContainer}>
              <Image source={profileData.imageUrl} style={styles.profileImage} />
              <View style={styles.completionOverlay}>
                <Text style={styles.completionText}>{`${profileCompletion}% COMPLETE`}</Text>
              </View>
            </View>

            {renderProfileItem('Nombre', profileData.name, !!profileData.name)}
            {renderProfileItem('Apellido', profileData.last_name, !!profileData.last_name)}
            {renderProfileItem('Nombre de la empresa', profileData.nombreEmpresa, !!profileData.nombreEmpresa)}
            {renderProfileItem('Nombre de Usuario', profileData.surname, !!profileData.surname)}
            {renderProfileItem('Ubicación Global de la empresa', profileData.UbicacionEmpresa, !!profileData.UbicacionEmpresa)}
            {renderProfileItem('Ubicación Local de la empresa', profileData.UbicacionLocal, !!profileData.UbicacionLocal)}
            {renderProfileItem('Público Objetivo de la empresa', profileData.PublicoObjetivo, !!profileData.PublicoObjetivo)}
            {renderProfileItem('Tipo de empresa', profileData.empresaType, !!profileData.empresaType)}
            {renderProfileItem('Especialización de la empresa', profileData.especializacionEmpresa, !!profileData.especializacionEmpresa)}

            {profileCompletion === 100 ? (
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.buttonText}>Home</Text>
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
                  <Text style={styles.HomeButtonText}>Ir a la home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => navigation.navigate('PickerProfileScreen')}
                >
                  <Text style={styles.buttonText}>Ver Perfil</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    padding: 24,
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
  },
  completionOverlay: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#FF4081',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 16,
    marginRight: 10,
    color: 'black',
  },
  completeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },

  homeButton: {
    borderColor: '#007AFF',
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  HomeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#FFBF00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePreviewPickerScreen;