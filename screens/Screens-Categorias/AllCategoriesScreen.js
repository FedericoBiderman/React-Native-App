import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const baseUrl = 'https://welcome-chamois-aware.ngrok-free.app';

const AllCategoriesScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  // Obtener categorías desde la API
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

  const navigateToCategoryDetail = (category) => {
    const screenName = `${category.Name.replace(/\s+/g, '')}CategoryDetailScreen`;
    navigation.navigate(screenName, { category });
  };

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => navigateToCategoryDetail(category)}
    >
      <Image
        source={{ uri: `https://welcome-chamois-aware.ngrok-free.app/assets/${category.Id}.png` }}
        style={styles.categoryIcon}
      />
      <Text style={styles.categoryName}>{category.Name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.placeholder} />
      </View>
      <Text style={styles.question}>What are you looking for?</Text>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map(renderCategory)}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    marginLeft: 60,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  categoryIcon: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AllCategoriesScreen;
