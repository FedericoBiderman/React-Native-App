import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AllProfilesScreen = ({ route }) => {
  const { title, profiles } = route.params;
  const navigation = useNavigation();
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxDistance: Infinity,
    category: '',
    minAge: 0,
    maxAge: Infinity,
    country: '',
  });

  const applyFilters = useCallback(() => {
    const filtered = profiles.filter(profile => 
      profile.rating >= filters.minRating &&
      profile.distance <= filters.maxDistance &&
      (filters.category === '' || profile.category === filters.category) &&
      profile.age >= filters.minAge &&
      profile.age <= filters.maxAge &&
      (filters.country === '' || profile.country === filters.country)
    );
    setFilteredProfiles(filtered);
    setFilterModalVisible(false);
  }, [profiles, filters]);

  const renderFilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtros</Text>
          {/* Aquí irían los controles para ajustar los filtros */}
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const ProfileCard = ({ profile, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.profileCardLarge}>
      <ImageBackground source={profile.image} style={styles.profileHeaderLarge}>
        <View style={styles.profileRating}>
          <Text style={styles.ratingText}>⭐ {profile.rating}</Text>
        </View>
      </ImageBackground>
      <View style={styles.profileContent}>
        <Image source={profile.image} style={styles.profileImageLarge} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
          <Text style={styles.profileCountry}>{profile.country}</Text>
          <Text style={styles.profileCategory}>{profile.category}</Text>
          <Text style={styles.profileDistance}>📍 {profile.distance} KM</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProfiles}
        renderItem={({ item }) => (
          <ProfileCard
            profile={item}
            onPress={() => navigation.navigate('ProfileScreen', { profile: item })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      {renderFilterModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  profileCardLarge: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileHeaderLarge: {
    height: 150,
    justifyContent: 'flex-end',
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
  profileContent: {
    flexDirection: 'row',
    padding: 12,
  },
  profileImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  profileCountry: {
    color: 'gray',
    marginBottom: 4,
  },
  profileCategory: {
    color: '#FCBD02',
    marginBottom: 4,
  },
  profileDistance: {
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  applyButton: {
    backgroundColor: '#FCBD02',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AllProfilesScreen;