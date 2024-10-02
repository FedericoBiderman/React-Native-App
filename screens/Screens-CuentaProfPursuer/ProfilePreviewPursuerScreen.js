import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const ProfilePreviewPursuerScreen = () => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;

  const profileCompletion = 75; // Example completion percentage

  const profileData = {
    imageUrl: require("./../../assets/profile4.png"),
    name: "Emily",
    last_name: "Johnson",
    age: 23,
    surname: "EmiJo",
    profesion: "Programadora",
    especializacionProfesion: "Programadora FrontEnd",
    educacion: "Si",
    universidad: "Graduate of the University of Cambridge",
    UbicacionGlobal: "United Kingdom",
    UbicacionLocal: "London",
    skills: "React Native, Javascript, CSS, HTML ",
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnimation, {
        toValue: profileCompletion / 100,
        duration: 1500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

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
    outputRange: ["0%", "100%"],
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const renderProfileItem = (label, value, isCompleted) => (
    <Animated.View
      style={[
        styles.profileItem,
        {
          opacity: animation,
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemValue}>{value || "No completado"}</Text>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={24} color="#FF3B30" />
        )}
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.gradient}
      >
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Preview</Text>
          <View style={{ width: 24 }} />
        </Animated.View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
          <Animated.Text
            style={[styles.progressText, { opacity: progressAnimation }]}
          >
            {profileCompletion}% Complete
          </Animated.Text>
        </View>

        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[styles.content, { opacity, transform: [{ translateY }] }]}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={profileData.imageUrl}
                style={styles.profileImage}
              />
              <View style={styles.completionOverlay}>
                <Text
                  style={styles.completionText}
                >{`${profileCompletion}% COMPLETE`}</Text>
              </View>
            </View>

            {renderProfileItem("Nombre", profileData.name, !!profileData.name)}
            {renderProfileItem(
              "Apellido",
              profileData.last_name,
              !!profileData.last_name
            )}
            {renderProfileItem("Edad", profileData.age, !!profileData.age)}
            {renderProfileItem(
              "Nombre de Usuario",
              profileData.surname,
              !!profileData.surname
            )}
            {renderProfileItem(
              "Profesion",
              profileData.profesion,
              !!profileData.profesion
            )}
            {renderProfileItem(
              "Especializacion",
              profileData.especializacionProfesion,
              !!profileData.especializacionProfesion
            )}
            {renderProfileItem(
              "Titulo de Grado",
              profileData.educacion,
              !!profileData.educacion
            )}
            {renderProfileItem(
              "Facu",
              profileData.universidad,
              !!profileData.universidad
            )}
            {renderProfileItem(
              "Pais de residencia",
              profileData.UbicacionGlobal,
              !!profileData.UbicacionGlobal
            )}
            {renderProfileItem(
              "Ciudad de residencia",
              profileData.UbicacionLocal,
              !!profileData.UbicacionLocal
            )}
            {renderProfileItem(
              "Habilidades",
              profileData.skills,
              !!profileData.skills
            )}
            {profileCompletion === 100 ? (
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text style={styles.buttonText}>Ir a la Home</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => navigation.navigate("TipoEmpresaScreen")}
                >
                  <Text style={styles.buttonText}>Completar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => navigation.navigate("HomeScreen")}
                >
                  <Text style={styles.buttonText}>Ir a la home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => navigation.navigate("PickerProfileScreen")}
                >
                  <Text style={styles.buttonText}>Ver Perfil</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </Animated.ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(76, 102, 159, 0.9)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  progressBarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    width: width * 0.7,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 80,
    paddingBottom: 20,
  },
  content: {
    padding: 24,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#fff",
  },
  completionOverlay: {
    position: "absolute",
    bottom: -10,
    backgroundColor: "#FF4081",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  itemValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemValue: {
    fontSize: 16,
    marginRight: 10,
    color: "rgba(255,255,255,0.7)",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  homeButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  profileButton: {
    backgroundColor: "#FF9800",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfilePreviewPursuerScreen;
