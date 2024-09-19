import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUpFinalizedScreen = () => {
    const navigation = useNavigation();

    const handleCreateProfessionalAccount = () => {
        navigation.navigate("CreateProfessionalAccountScreen");
    };

    const handleGoToHome = () => {
        navigation.navigate("HomeScreen");
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "100%" }]} />
            </View>
            <Text style={styles.title}>
                Ya creaste tu cuenta, ¿quieres crear tu cuenta profesional o ir a la home?
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateProfessionalAccount}
            >
                <Text style={styles.buttonText}>Crear cuenta profesional</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleGoToHome}
            >
                <Text style={styles.secondaryButtonText}>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 80,
        backgroundColor: '#fff',
    },
    progressBar: {
        height: 25,
        backgroundColor: '#e0e0e0',
        marginLeft: 120,
        width: 160,
        marginBottom: 20,
        borderRadius: 30,
    },
    progressFill: {
        height: '100%',
        borderRadius: 30,
        width: 160,
        backgroundColor: '#4CAF50',
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#007AFF",
    },
    secondaryButtonText: {
        color: "#007AFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SignUpFinalizedScreen;