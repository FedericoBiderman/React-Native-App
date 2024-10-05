import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Tooltip } from 'react-native-elements';

const CreateProfessionalAccountScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empecemos. Para empezar a crear tu cuenta profesional, necesitamos saber si vas a ser un Pursuer o un Picker.</Text>
      
      <Tooltip popover={<Text>Un Pursuer busca oportunidades y persigue objetivos.</Text>}>
        <TouchableOpacity
          style={[styles.button, styles.pursuerButton]}
          onPress={() => navigation.navigate('DataEntryScreen', { role: 'Pursuer' })}
        >
          <Text style={styles.buttonText}>Pursuer</Text>
        </TouchableOpacity>
      </Tooltip>
      
      <Tooltip popover={<Text>Un Picker selecciona y elige entre opciones disponibles.</Text>}>
        <TouchableOpacity
          style={[styles.button, styles.pickerButton]}
          onPress={() => navigation.navigate('DataEntryScreen', { role: 'Picker' })}
        >
          <Text style={styles.pickerButtonText}>Picker</Text>
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 30,
    },
    button: {
      width: '100%',
      padding: 15,
      borderRadius: 5,
      marginVertical: 10,
    },
    pursuerButton: {
      backgroundColor: '#007AFF',
      width: 250,
    },
    pickerButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#007aff',
      width: 250,
    },
    pickerButtonText: {
      color: '#007aff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  
  export default CreateProfessionalAccountScreen;