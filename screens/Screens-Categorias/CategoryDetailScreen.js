import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LAWYERS_DATA = [
  {
    id: '1',
    name: 'John Doe',
    rating: 4.5,
    distance: '2 km',
    description: 'Specializes in corporate law',
    imageName: 'lawyer1',
    flag: '🇺🇸',
    isNew: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    rating: 4.8,
    distance: '1.5 km',
    description: 'Expert in family law',
    imageName: 'lawyer2',
    flag: '🇬🇧',
    isNew: true,
  },
  // Agrega más abogados aquí...
];

const CategoryDetailScreen = () => {
  const [selectedGender, setSelectedGender] = useState('Hombres');
  const [lawyers, setLawyers] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('All');
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    setLawyers(LAWYERS_DATA);
  }, []);

  const filterLawyers = () => {
    let filtered = LAWYERS_DATA;
    if (ratingFilter === '4-5') {
      filtered = filtered.filter(lawyer => lawyer.rating >= 4);
    } else if (ratingFilter === '3-4') {
      filtered = filtered.filter(lawyer => lawyer.rating >= 3 && lawyer.rating < 4);
    } else if (ratingFilter === '1-3') {
      filtered = filtered.filter(lawyer => lawyer.rating < 3);
    } else if (ratingFilter === 'New') {
      filtered = filtered.filter(lawyer => lawyer.isNew);
    } else if (ratingFilter === 'Favs') {
      filtered = filtered.filter(lawyer => favorites[lawyer.id]);
    }
    setLawyers(filtered);
  };

  useEffect(() => {
    filterLawyers();
  }, [ratingFilter, favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderLawyer = ({ item }) => {
    const heartScale = new Animated.Value(1);
    
    const animateHeart = () => {
      Animated.sequence([
        Animated.timing(heartScale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
        Animated.timing(heartScale, { toValue: 1, duration: 100, useNativeDriver: true })
      ]).start();
      toggleFavorite(item.id);
    };

    return (
      <TouchableOpacity 
        style={styles.lawyerCard}
        onPress={() => navigation.navigate('MatchScreen', { lawyer: item })}
      >
        <ImageBackground source={getImageSource(item.imageName)} style={styles.lawyerBackground}>
          <View style={styles.lawyerOverlay}>
            <View style={styles.lawyerInfo}>
              <Text style={styles.lawyerName}>{item.name} {item.flag}</Text>
              <Text style={styles.rating}>{'★'.repeat(Math.floor(item.rating))}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton} onPress={animateHeart}>
              <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                <Ionicons 
                  name={favorites[item.id] ? "heart" : "heart-outline"} 
                  size={24} 
                  color={favorites[item.id] ? "red" : "#fff"} 
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderRatingFilter = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ratingFilter}>
      {['All', '4-5', '3-4', '1-3', 'New', 'Favs'].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.filterButton, ratingFilter === filter && styles.selectedFilter]}
          onPress={() => setRatingFilter(filter)}
        >
          <Text style={[styles.filterText, ratingFilter === filter && styles.selectedFilterText]}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const getImageSource = (imageName) => {
    switch (imageName) {
      case 'lawyer1':
        return require('../../assets/profile1.png');
      case 'lawyer2':
        return require('../../assets/profile2.png');
      // Agrega más casos según sea necesario
      default:
        return require('../../assets/profile3.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.time}>9:30</Text>
      </View>
      <ScrollView>
        <View style={styles.categoryCard}>
          <ImageBackground source={require('../../assets/lawyer.png')} style={styles.categoryImage}>
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryTitle}>Advocacy</Text>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Guardar categoría</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
        {renderRatingFilter()}
        <FlatList
          data={lawyers}
          renderItem={renderLawyer}
          keyExtractor={item => item.id}
          style={styles.lawyerList}
        />
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
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCard: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 20,
  },
  categoryImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  categoryOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    color: '#8e44ad',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  genderToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 20,
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
  ratingFilter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: '#8e44ad',
  },
  filterText: {
    fontWeight: 'bold',
  },
  selectedFilterText: {
    color: '#fff',
  },
  lawyerList: {
    paddingHorizontal: 20,
  },
  lawyerCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  lawyerBackground: {
    height: 200,
    justifyContent: 'flex-end',
  },
  lawyerOverlay: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  lawyerInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  rating: {
    color: '#f1c40f',
    marginBottom: 5,
  },
  distance: {
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    color: '#ddd',
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
});

export default CategoryDetailScreen;