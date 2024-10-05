import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DataEntryScreen = ({ route }) => {
  const { role } = route.params;
  const navigation = useNavigation();

  const handleContinue = () => {
    if (role === 'Picker') {
      navigation.navigate("CompanyNameEntryScreen");
    } else if (role === 'Pursuer') {
      navigation.navigate("ProfesionNameEntryScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Perfecto, ahora que decidiste ser un {role},
        vamos a llenar tus datos profesionales.
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DataEntryScreen;