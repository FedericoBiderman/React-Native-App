import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DNIScreen = ({ route }) => {
    const navigation = useNavigation();
    const [animation] = useState(new Animated.Value(0));
    const [progressAnimation] = useState(new Animated.Value(0));

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
        outputRange: ['60%', '80%'],
      });
    
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpFinalizedScreen')}>
            <Text style={styles.skipText}>Omitir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>
  
        <ScrollView>
          <Animated.View style={[{ opacity, transform: [{ translateY }] }]}>
            <Text style={styles.title}>Scan your DNI </Text>
            <Text style={styles.subtitle}>Please scan your DNI to continue </Text>
                <TouchableOpacity style={styles.scanButton} onPress={handleScanDNI}>
                    <Text style={styles.buttonText}>Scan DNI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('SignUpFinalizedScreen', { ...route.params })}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>
          Do you already have an account? <Text style={styles.loginHighlight}>Log in</Text>
        </Text>
        </TouchableOpacity>
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
      skipText: {
        fontSize: 16,
        color: 'black',
      },
      progressBarContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        width: width * 0.7,
        borderRadius: 4,
        overflow: 'hidden',
      },
      progressFill: {
        height: '100%',
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
        backgroundColor: '#007aff',
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
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007aff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    continueButtonText: {
        color: '#007aff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    loginHighlight: {
        color: "#007AFF",
      },
    
      loginText: {
        marginTop: 20,
        textAlign: "center",
        color: "#333",
      },
});

export default DNIScreen;
