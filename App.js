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
import ProfileScreen from "./screens/Screens-Profile/ProfileScreen";
import OlvideContrasenaScreen from "./screens/Screens-OlvideContrasena/OlvideContrasenaScreen";
import OlvideContrasenaScreen2 from "./screens/Screens-OlvideContrasena/OlvideContrasenaScreen2";
import NewPasswordScreen from "./screens/Screens-NewPassword/NewPasswordScreen";
import VolverInicioSesionScreen from "./screens/Screens-NewPassword/VolverInicioSesionScreen";
import CreateProfessionalAccountScreen from "./screens/Screens-CuentaProf/CreateProfessionalAccountScreen";
import DataEntryScreen from "./screens/Screens-CuentaProf/DataEntryScreen";
import CompanyNameEntryScreen from "./screens/Screens-CuentaProfPicker/CompanyNameEntryScreen";
import TipoEmpresaScreen from "./screens/Screens-CuentaProfPicker/TipoEmpresaScreen";
import EspecializacionEmpresaScreen from "./screens/Screens-CuentaProfPicker/EspecializacionEmpresaScreen";
import UbicacionGlobEmpresaScreen from "./screens/Screens-CuentaProfPicker/UbicacionGlobEmpresaScreen";
import ImpactoLocalEmpresaScreen from "./screens/Screens-CuentaProfPicker/ImpactoLocalEmpresaScreen";
import PublicoObjetivoEmpresaScreen from "./screens/Screens-CuentaProfPicker/PublicoObjetivoEmpresaScreen";
import ProfesionNameEntryScreen from "./screens/Screens-CuentaProfPursuer/ProfesionNameEntryScreen";
import EspecializacionProfesionScreen from "./screens/Screens-CuentaProfPursuer/EspecializacionProfesionScreen";
import FormacionAcademicaScreen from "./screens/Screens-CuentaProfPursuer/FormacionAcademicaScreen";
import TrayectoriaAcademicaScreen from "./screens/Screens-CuentaProfPursuer/TrayectoriaAcademicaScreen";
import UbicacionGlobalScreen from "./screens/Screens-CuentaProfPursuer/UbicacionGlobalScreen";
import UbicacionLocalScreen from "./screens/Screens-CuentaProfPursuer/UbicacionLocalScreen";
import HabilidadesScreen from "./screens/Screens-CuentaProfPursuer/HabilidadesScreen";
import CuentaProfPickerTerminadoScreen from "./screens/Screens-CuentaProf/CuentaProfPickerTerminadoScreen";
import CuentaProfPursuerTerminadoScreen from "./screens/Screens-CuentaProf/CuentaProfPursuerTerminadoScreen";
import ProfilePreviewPickerScreen from "./screens/Screens-CuentaProfPicker/ProfilePreviewPickerScreen";
import ProfilePreviewPursuerScreen from "./screens/Screens-CuentaProfPursuer/ProfilePreviewPursuerScreen";
import CategoryDetailScreen from "./screens/Screens-Categorias/CategoryDetailScreen";
import AllCategoriesScreen from "./screens/Screens-Categorias/AllCategoriesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MatchScreen"
        component={MatchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
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
        />
        <Stack.Screen
          name="CreateProfessionalAccountScreen"
          component={CreateProfessionalAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DataEntryScreen"
          component={DataEntryScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="CompanyNameEntryScreen"
          component={CompanyNameEntryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TipoEmpresaScreen"
          component={TipoEmpresaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EspecializacionEmpresaScreen"
          component={EspecializacionEmpresaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UbicacionGlobEmpresaScreen"
          component={UbicacionGlobEmpresaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImpactoLocalEmpresaScreen"
          component={ImpactoLocalEmpresaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PublicoObjetivoEmpresaScreen"
          component={PublicoObjetivoEmpresaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfesionNameEntryScreen"
          component={ProfesionNameEntryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EspecializacionProfesionScreen"
          component={EspecializacionProfesionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormacionAcademicaScreen"
          component={FormacionAcademicaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrayectoriaAcademicaScreen"
          component={TrayectoriaAcademicaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UbicacionGlobalScreen"
          component={UbicacionGlobalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UbicacionLocalScreen"
          component={UbicacionLocalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HabilidadesScreen"
          component={HabilidadesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CuentaProfPickerTerminadoScreen"
          component={CuentaProfPickerTerminadoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CuentaProfPursuerTerminadoScreen"
          component={CuentaProfPursuerTerminadoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePreviewPickerScreen"
          component={ProfilePreviewPickerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePreviewPursuerScreen"
          component={ProfilePreviewPursuerScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="CategoryDetailScreen"
          component={CategoryDetailScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="AllCategoriesScreen"
          component={AllCategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
