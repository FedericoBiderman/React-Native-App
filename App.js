import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import InitialScreen from "./screens/Screens-Login/InitialScreen";
import LoginScreen from "./screens/Screens-Login/LoginScreen";
import RegisterScreen from "./screens/Screens-Register/RegisterScreen";
import OlvideContrasenaScreen from "./screens/Screens-OlvideContrasena/OlvideContrasenaScreen";
import OlvideContrasenaScreen2 from "./screens/Screens-OlvideContrasena/OlvideContrasenaScreen2";
import NewPasswordScreen from "./screens/Screens-NewPassword/NewPasswordScreen";
import VolverInicioSesionScreen from "./screens/Screens-NewPassword/VolverInicioSesionScreen";
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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
