import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const DNIScreen = ({ route }) => {
    const navigation = useNavigation();

    const handleScanDNI = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // Navegar directamente a la pantalla finalizada sin guardar imagen
        if (!result.cancelled) {
            navigation.navigate('SignUpFinalizedScreen', { ...route.params });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '80%' }]} />
                </View>

                <Text style={styles.title}>Scan Your DNI</Text>
                <Text style={styles.subtitle}>Please scan your DNI to continue.</Text>

                <TouchableOpacity style={styles.scanButton} onPress={handleScanDNI}>
                    <Text style={styles.buttonText}>Scan DNI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('SignUpFinalizedScreen', { ...route.params })}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    progressBar: {
        height: 10,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 30,
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#4CAF50',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    scanButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    continueButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DNIScreen;
