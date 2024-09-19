import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const DNIScreen = ({ route }) => {
    const [dniImage, setDniImage] = useState(null);
    const navigation = useNavigation();

    const handleScanDNI = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setDniImage(result.uri);
        }
    };

    const handleContinue = () => {
        navigation.navigate('SignUpFinalizedScreen', { ...route.params, dniImage });
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '80%' }]} />
            </View>
            <Text style={styles.title}>Scan your DNI</Text>
            {dniImage && <Image source={{ uri: dniImage }} style={styles.dniPreview} />}
            <TouchableOpacity style={styles.scanButton} onPress={handleScanDNI}>
                <Text style={styles.buttonText}>Scan DNI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
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
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    continueButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dniPreview: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    scanButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default DNIScreen;