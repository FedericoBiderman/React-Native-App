import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const baseUrl = 'https://welcome-chamois-aware.ngrok-free.app';
const [categories, setCategories] = useState([]);
const [categoryRequired , setMatchxCategory] = useState ([]);
useEffect(() => {
  const fetchCategories = async () => {
      try {
          const response = await axios.get(`${baseUrl}/api/category`);
          setCategories(response.data);
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

  fetchCategories();
}, []);

useEffect(() => {
  const matchxCategory = async () => {
    try {
      const matchesResponse = await axios.get(`${baseUrl}/api/pursuerM/${categoryRequired}`);
            const filteredData = matchesResponse.data.map(item => ({
        Id: item.Id,
        Name: item.Name
      }));

      setMatchxCategory(filteredData);
    } catch (error) {
      console.error('Error finding matches x categories:', error);
    }
  };

  matchxCategory();
}, [categoryRequired]);

console.log(filteredData);

const profileSections = [
    {
        title: "Nuevos talentos que se suman", 
        profiles: [
            { id: 1, name: 'Martina', age: 22, image: require('../../assets/profile1.png'), category: 'Medica', rating: 4.6, distance: 0.7, country: '🇦🇷' },
            { id: 2, name: 'Jimmy', age: 24, image: require('../../assets/profile2.png'), category: 'Emprendedor', rating: 4.9, distance: 1.2, country: '🇺🇸' },
            { id: 3, name: 'Santiago', age: 23, image: require('../../assets/profile3.png'), category: 'Abogado', rating: 2.7, distance: 0.7, country: '🇲🇽' },
            { id: 4, name: 'Emily', age: 21, image: require('../../assets/profile4.png'), category: 'Community Manager', rating: 4.8, distance: 1.2, country: '🇺🇸' },
        ]
    },
    { 
        title: "Descubrí estos genios ocultos",
        profiles: [
            { id: 5, name: 'Aitana', age: 31, image: require('../../assets/profile5.png'), category: 'Horticultora', rating: 4.5, distance: 0.5, country: '🇪🇸' },
            { id: 6, name: 'Malaika', age: 29, image: require('../../assets/profile6.png'), category: 'Community Manager', rating: 4.7, distance: 0.9, country: '🇿🇦' },
            { id: 7, name: 'Angus', age: 32, image: require('../../assets/profile7.png'), category: 'Modelo', rating: 4.8, distance: 0.5, country: '🇮🇪' },
            { id: 8, name: 'Bastian', age: 33, image: require('../../assets/profile8.png'), category: 'Fotografo', rating: 4.9, distance: 0.9, country: '🇫🇷' },
        ]
    },
    {
        title: "Experiencia que deja huella",
        profiles: [
            { id: 9, name: 'Vittoria', age: 41, image: require('../../assets/profile9.png'), category: 'Costurera', rating: 3.9, distance: 0.3, country: '🇮🇹' },
            { id: 10, name: 'Diantha', age: 45, image: require('../../assets/profile10.png'), category: 'Cientifica', rating: 4.0, distance: 1.5, country: '🇳🇱' },
            { id: 11, name: 'Angus', age: 60, image: require('../../assets/profile11.png'), category: 'Peluquero', rating: 4.4, distance: 0.3, country: '🇮🇪' },
            { id: 12, name: 'Janos', age: 43, image: require('../../assets/profile12.png'), category: 'Panadero', rating: 4.6, distance: 1.5, country: '🇭🇺' },
        ]
    },
    {
        title: "El paraíso del talento joven",
        profiles: [
            { id: 13, name: 'Alicia', age: 25, image: require('../../assets/profile13.png'), category: 'Diseñadora UX', rating: 4.8, distance: 0.8, country: '🇦🇷' },
            { id: 14, name: 'Paul', age: 26, image: require('../../assets/profile14.png'), category: 'Programador Front', rating: 4.8, distance: 1.1, country: '🇩🇪' },
            { id: 15, name: 'Jose', age: 22, image: require('../../assets/profile15.png'), category: 'Desarrollador Web', rating: 4.9, distance: 0.8, country: '🇲🇽' },
            { id: 16, name: 'Summer', age: 23, image: require('../../assets/profile16.png'), category: 'Desarrolladora Mobile', rating: 5.0, distance: 1.1, country: '🇬🇧' },
        ]
    },
    { 
        title: "Candidatos para compartir éxitos",
        profiles: [
            { id: 17, name: 'Sofia', age: 28, image: require('../../assets/profile17.png'), category: 'CEO', rating: 4.4, distance: 0.6, country: '🇮🇹' },
            { id: 18, name: 'Tess', age: 40, image: require('../../assets/profile18.png'), category: 'Secretaria', rating: 4.1, distance: 1.0, country: '🇳🇱' },
            { id: 19, name: 'Robert', age: 45, image: require('../../assets/profile19.png'), category: 'Policia', rating: 4.6, distance: 0.6, country: '🇺🇸' },
            { id: 20, name: 'Michael', age: 40, image: require('../../assets/profile20.png'), category: 'Abogado', rating: 4.2, distance: 1.0, country: '🇺🇸' }, 
        ]
    },
    {
        title: "Disfruta del mejor talento",
        profiles: [
            { id: 21, name: 'Giorgia', age: 21, image: require('../../assets/profile21.png'), category: 'Programadora', rating: 4.7, distance: 0.4, country: '🇮🇹' },
            { id: 22, name: 'Sussane', age: 22, image: require('../../assets/profile22.png'), category: 'Modelo', rating: 4.8, distance: 0.7, country: '🇩🇪' },
            { id: 23, name: 'Richard', age: 25, image: require('../../assets/profile23.png'), category: 'Baterista', rating: 4.9, distance: 0.4, country: '🇨🇦' },
            { id: 24, name: 'Michael', age: 31, image: require('../../assets/profile24.png'), category: 'Gerente de ventas', rating: 5.0, distance: 0.7, country: '🇦🇷' },
        ]
    }
];

const HomeScreen = () => {
    const navigation = useNavigation();
  
    const renderProfileSection = (section) => (
      <View key={section.title}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllProfilesScreen', { title: section.title, profiles: section.profiles })}>
            <Text style={styles.seeMoreText}>Ver más</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profilesContainer}>
          {section.profiles.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              // Navegación al MatchScreen cuando se presiona el rectángulo grande
              onPress={() => navigation.navigate('MatchScreen', { profile })}
              style={styles.profileCard}
            >
              <ImageBackground source={profile.image} style={styles.profileHeader}>
                <View style={styles.profileRating}>
                  <Text style={styles.ratingText}>⭐ {profile.rating}</Text>
                </View>
                {section.title === 'Nuevos talentos que se suman' && (
                  <View style={styles.newTag}>
                    <Text style={styles.newTagText}>NUEVO</Text>
                  </View>
                )}
              </ImageBackground>
              <View style={styles.profileContent}>
                <TouchableOpacity
                  // Navegación al ProfileScreen cuando se presiona la imagen pequeña
                  onPress={() => navigation.navigate('ProfileScreen', { profile })}
                >
                  <Image source={profile.image} style={styles.profileImage} />
                </TouchableOpacity>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
                  <Text style={styles.profileCountry}>{profile.country}</Text>
                  <Text style={styles.profileCategory}>{profile.category}</Text>
                  <Text style={styles.profileDistance}>📍 {profile.distance} KM</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('PickerProfileScreen')}>
              <View style={styles.userInfo}>
                <Text style={styles.headerText}>Hola, IBM</Text>
                <Ionicons name="chevron-forward" size={24} color="black"/>
              </View>
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')} style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={styles.iconButton}>
                <Ionicons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('HelpScreen')} style={styles.iconButton}>
                <Text style={styles.helpText}>Ayuda</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <Ionicons name="search" size={20} color="gray" />
            <Text style={styles.searchText}>¿Qué estás buscando?</Text>
          </TouchableOpacity>
  
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllCategoriesScreen', { categories })}>
              <Text style={styles.seeMoreText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => navigation.navigate('CategoryDetailScreen', { category })}
              >
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
  
          {profileSections.map(renderProfileSection)}
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatScreen')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
            <Text style={styles.tabText}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Text style={styles.tabText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('PickerProfileScreen')}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.tabText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    scrollContent: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 8,
    },
    headerIcons: {
      flexDirection: 'row',
    },
    iconButton: {
      marginLeft: 16,
    },
    helpText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    searchText: {
      marginLeft: 8,
      color: 'gray',
    },
    sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    seeMoreText: {
      color: '#FCBD02',
      fontWeight: 'bold',
    },
    categoriesContainer: {
      marginBottom: 24,
    },
    categoryItem: {
      marginRight: 16,
      alignItems: 'center',
    },
    categoryImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    categoryName: {
      marginTop: 8,
      textAlign: 'center',
    },
    profilesContainer: {
      marginBottom: 24,
    },
    profileCard: {
      width: 200,
      marginRight: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
    },
    profileHeader: {
      height: 100,
      justifyContent: 'space-between',
      padding: 8,
    },
    profileRating: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    ratingText: {
      color: 'white',
      fontWeight: 'bold',
    },
    newTag: {
      backgroundColor: '#FCBD02',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    newTagText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    profileContent: {
      flexDirection: 'row',
      padding: 12,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    profileCountry: {
      color: 'gray',
      marginBottom: 4,
    },
    profileCategory: {
      color: 'blue',
      marginBottom: 4,
    },
    profileDistance: {
      color: 'gray',
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    tabItem: {
      alignItems: 'center',
    },
    tabText: {
      fontSize: 12,
      marginTop: 4,
    },
  });
  
    export default HomeScreen;