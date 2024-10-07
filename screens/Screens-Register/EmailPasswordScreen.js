import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const EmailPasswordScreen = ({ route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [animation] = useState(new Animated.Value(0));
    const [progressAnimation] = useState(new Animated.Value(0));
    const navigation = useNavigation();

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

    const handleContinue = () => {
        navigation.navigate('DNIScreen', { ...route.params, email, password });
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
        outputRange: ['40%', '60%'],
      });

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DNIScreen')}>
            <Text style={styles.skipText}>Omitir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>
  
        <ScrollView>
          <Animated.View style={[styles.formContainer, { opacity, transform: [{ translateY }] }]}>
            <Text style={styles.title}>Create an email and password </Text>
                <TextInput
                    style={styles.input}
                    placeholder="What's your email address?"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
            <Text style={styles.infoText}>
            Unlock a world of possibilities! Your email is your key to seamless communication and account recovery. Create a strong password to safeguard your digital identity. Together, let's build a fortress around your personal information.
        </Text>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
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
      formContainer: {
        padding: 24,
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 24,
        textAlign: 'center',
      },
      input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
      },
    continueButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
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
      infoText: {
        marginBottom: 20,
        color: "#666",
        textAlign: "center",
      },
});

export default EmailPasswordScreen;
