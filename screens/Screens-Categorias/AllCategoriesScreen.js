import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = [
    { id: 1, name: 'Pediatrist', image: require('../../assets/pediatrist.png') },
    { id: 2, name: 'Lawyer', image: require('../../assets/lawyer.png') },
    { id: 3, name: 'Veterinary', image: require('../../assets/veterinary.png') },
    { id: 4, name: 'Teacher', image: require('../../assets/teacher.png') },
    { id: 5, name: 'Data scientist', image: require('../../assets/data-scientist.png') },
    { id: 6, name: 'Architect', image: require('../../assets/architect.png') },
    { id: 7, name: 'Cybersecurity specialist', image: require('../../assets/cybersecurity-specialist.png') },
    { id: 8, name: 'Economist', image: require('../../assets/economist.png') },
    { id: 9, name: 'Journalist', image: require('../../assets/journalist.png') },
    { id: 10, name: 'Mechanical enginner', image: require('../../assets/mechanical-enginner.png') },
    { id: 11, name: 'Mobile application developer', image: require('../../assets/Mobile-application.png') },
    { id: 12, name: 'Blockchain developer', image: require('../../assets/blockchain-developer.png') },
    { id: 13, name: 'Biologist', image: require('../../assets/biologist.png') },
    { id: 14, name: 'IoT', image: require('../../assets/IoT.png') },
    { id: 15, name: 'Community mannager', image: require('../../assets/community-manager.png') },
    { id: 16, name: 'Videogames developer', image: require('../../assets/videogames-developer.png') },
    { id: 17, name: 'Counter', image: require('../../assets/counter.png') },
    { id: 18, name: 'Robotics', image: require('../../assets/robotics.png') },
    { id: 19, name: 'Biotechnologist', image: require('../../assets/biotechnologist.png') },
    { id: 20, name: 'Artificial intelligence specialist', image: require('../../assets/IA.png') },
    { id: 21, name: 'Psychologist', image: require('../../assets/psychologist.png') },
    { id: 22, name: 'Cloud infrastructure enginner', image: require('../../assets/cloud.png') },
    { id: 23, name: 'Software enginner', image: require('../../assets/software-enginner.png') },
    { id: 24, name: 'FrontEnd developer', image: require('../../assets/FrontEnd.png') },
    { id: 25, name: 'Civil enginner', image: require('../../assets/civil-enginner.png') },
];

const AllCategoriesScreen = () => {
  const navigation = useNavigation();

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => navigation.navigate('CategoryDetailScreen', { category })}
    >
      <Image source={category.image} style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
    </View>
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
    width: '80%',
    height: '80%',
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