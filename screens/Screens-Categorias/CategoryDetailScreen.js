import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const lawyers = [
  { id: '1', name: 'Jordan', flag: '🇺🇸', rating: 5, distance: '1.2 miles away', description: 'Supporting line text lorem ipsum dolo...' },
  { id: '2', name: 'Jose', flag: '🇲🇽', rating: 5, distance: '2.9 miles away', description: 'Supporting line text lorem ipsum dolo...' },
  { id: '3', name: 'Michael', flag: '🇬🇧', rating: 5, distance: '1 mile away', description: 'Supporting line text lorem ipsum dolo...' },
];

export default function Component() {
  const [selectedGender, setSelectedGender] = useState('Hombres');

  const renderLawyer = ({ item }) => (
    <View style={styles.lawyerCard}>
      <Image source={{ uri: '../../assets/profile2.png' }} style={styles.avatar} />
      <View style={styles.lawyerInfo}>
        <Text style={styles.lawyerName}>{item.name} {item.flag}</Text>
        <Text style={styles.rating}>{'★'.repeat(item.rating)}</Text>
        <Text style={styles.distance}>{item.distance}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="#8e44ad" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.time}>9:30</Text>
      </View>
      <View style={styles.categoryCard}>
        <Image source={{ uri: '../../assets/lawyer.png' }} style={styles.categoryImage} />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>Advocacy</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar categoría</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Lawyers</Text>
      <View style={styles.genderToggle}>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'Hombres' && styles.selectedGender]}
          onPress={() => setSelectedGender('Hombres')}
        >
          <Text style={[styles.genderButtonText, selectedGender === 'Hombres' && styles.selectedGenderText]}>Hombres</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'Mujeres' && styles.selectedGender]}
          onPress={() => setSelectedGender('Mujeres')}
        >
          <Text style={[styles.genderButtonText, selectedGender === 'Mujeres' && styles.selectedGenderText]}>Mujeres</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lawyers}
        renderItem={renderLawyer}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View 231 Lawyers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryInfo: {
    marginLeft: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  saveButtonText: {
    color: '#8e44ad',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genderToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#8e44ad',
    borderRadius: 20,
  },
  genderButtonText: {
    fontWeight: 'bold',
  },
  selectedGenderText: {
    color: '#fff',
  },
  lawyerCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  lawyerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  lawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    color: '#f1c40f',
  },
  distance: {
    color: '#7f8c8d',
  },
  description: {
    color: '#7f8c8d',
  },
  favoriteButton: {
    justifyContent: 'center',
  },
  viewAllButton: {
    backgroundColor: '#8e44ad',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});