import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OlvideContraseñaScreen2 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validate email</Text>
      <Text>Check your email and enter the code</Text>
      <View style={styles.codeContainer}>
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.codeInput}
          maxLength={1}
          keyboardType="number-pad"
        />
      </View>
      <Button title="Paste code" onPress={() => {}} />
      <Button
        title="Validate"
        onPress={() => navigation.navigate("NewPasswordScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: "#fff" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginVertical: 20 
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    textAlign: "center",
    width: 40,
    height: 50,
    fontSize: 20,
  },
});

export default OlvideContraseñaScreen2;
