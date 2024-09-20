import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const DataEntryScreen = ({ route }) => {
    const { role } = route.params;
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfecto, ahora que decidiste cual es el tipo de cuenta que usaras, vamos a llenar tus datos profesionales.</Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
    continueButton: {
      backgroundColor: '#007AFF',
      width: '100%',
      padding: 15,
      borderRadius: 5,
      marginTop: 30,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  
  export default DataEntryScreen;