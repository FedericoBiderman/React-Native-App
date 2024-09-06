import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/Screens-Login/LoginScreen.js";
import { createStackNavigator } from "@react-navigation/stack";
import axios from 'axios';


const StackLogin = createStackNavigator();


function StackLoginComponent() {
  return (
    <StackLogin.Navigator>
      <StackLogin.Screen
        name="LoginScreen"
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
    </StackLogin.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackLoginComponent />
    </NavigationContainer>
  );
}