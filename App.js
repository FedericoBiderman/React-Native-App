import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import InitialScreen from "./screens/Screens-Login/InitialScreen";
import LoginScreen from "./screens/Screens-Login/LoginScreen";
import RegisterScreen from "./screens/Screens-Register/RegisterScreen";
import BirthdayPhoneScreen from "./screens/Screens-Register/BirthdayPhoneScreen";
import GenderScreen from "./screens/Screens-Register/GenderScreen";
import EmailPasswordScreen from "./screens/Screens-Register/EmailPasswordScreen";
import DNIScreen from "./screens/Screens-Register/DNIScreen";
import SignUpFinalizedScreen from "./screens/Screens-Register/SignUpFinalizedScreen";
import HomeScreen from "./screens/Screens-Home/HomeScreen";
import OlvideContrasenaScreen from "./screens/Screens-OlvideContrasena/OlvideContrasenaScreen";
import OlvideContrasenaScreen2 from "./screens/Screens-OlvideContrasena/OlvideContrasenaScreen2";
import NewPasswordScreen from "./screens/Screens-NewPassword/NewPasswordScreen";
import VolverInicioSesionScreen from "./screens/Screens-NewPassword/VolverInicioSesionScreen";
import ProfileScreen from "./screens/Screens-Profile/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OlvideContrasenaScreen"
          component={OlvideContrasenaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OlvideContrasenaScreen2"
          component={OlvideContrasenaScreen2}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="NewPasswordScreen"
          component={NewPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VolverInicioSesionScreen"
          component={VolverInicioSesionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BirthdayPhoneScreen"
          component={BirthdayPhoneScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailPasswordScreen"
          component={EmailPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DNIScreen"
          component={DNIScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpFinalizedScreen"
          component={SignUpFinalizedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
