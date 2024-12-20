import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';

const { width } = Dimensions.get('window');

const BirthdayPhoneScreen = ({ route }) => {
  const [birthday, setBirthday] = useState(new Date(2009, 0, 1));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'https://welcome-chamois-aware.ngrok-free.app';
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/country`);
        const countryData = response.data.map((country) => ({
          label: `${country.Name} (${country.alpha_2})`,
          value: country.alpha_2,
          flag: country.alpha_2,
        }));
        setCountries(countryData);
        setCountryCode(countryData[0]?.value || "+1");
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

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

  const handlePhoneNumberChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 12); // Permite hasta 12 dígitos
    let formatted = cleaned;
  
    if (cleaned.length > 3 && cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    setPhoneNumber(formatted);
  };

  const handleContinue = () => {
    if (phoneNumber.length < 13) {
      Alert.alert("Error", "El número de teléfono debe tener 12 dígitos.");
      return;
    }

    const data = {
      birthday: birthday.toISOString().split("T")[0],
      phoneNumber: phoneNumber,
      countryCode: countryCode,
    };
    console.log(data);

    navigation.navigate("GenderScreen", { ...route.params, ...data });
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
    outputRange: ['0%', '20%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GenderScreen')}>
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
          <Text style={styles.title}>Birthday and phone number</Text>

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>
              {birthday.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || birthday;
                setShowDatePicker(false);
                setBirthday(currentDate);
              }}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Número de Teléfono - 123-4567-8901"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            maxLength={13}
          />

          <Text>Seleccione el código de país</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue) => setCountryCode(itemValue)}
              style={styles.picker}
            >
              {countries.map((country) => (
                <Picker.Item key={country.value} label={`${country.flag} ${country.label}`} value={country.value} />
              ))}
            </Picker>
          )}

          <Text style={styles.infoText}>
            Enhance your security and stay connected! Your phone number helps us
            protect your account, while your birth date ensures you get
            age-appropriate content and special birthday surprises. Don't worry,
            we keep this information private and secure.
          </Text>

          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.loginText}>
              Do you already have an account?{" "}
              <Text style={styles.loginHighlight}>Log in</Text>
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
  datePickerButton: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  datePickerText: {
    color: "#555",
    fontSize: 18,
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
  picker: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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

export default BirthdayPhoneScreen;
