import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigation = useNavigation();

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const profileData = {
    imageUrl: require('../../assets/profile1.png'),
    name: 'Martina',
    profession: 'Médica y Neurocirujana',
    completionPercentage: 26,
    followers: 150,
    following: 200,
    posts: 50,
  };

  const renderIconButton = (iconName, label) => (
    <TouchableOpacity style={styles.iconButton}>
      <View style={styles.iconCircle}>
        <Ionicons name={iconName} size={24} color="#ff4d4d" />
      </View>
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileImageContainer}>
          <Image source={profileData.imageUrl} style={styles.profileImage} />
          <View style={styles.completionOverlay}>
            <Text style={styles.completionText}>{`${profileData.completionPercentage}% COMPLETE`}</Text>
          </View>
        </View>

        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.profession}>{profileData.profession}</Text>

        <View style={styles.whiteRectangle}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={toggleFollow}
          >
            <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>

          <View style={styles.iconButtonsRow}>
            {renderIconButton('shield-checkmark', 'SAFETY')}
            {renderIconButton('pencil', 'EDIT PROFILE')}
            {renderIconButton('camera', 'ADD MEDIA')}
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="star-sharp" size={24} color="#33DEF0" />
            <Text style={styles.featureText}>Super Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
          <Image source={require('./../../assets/icon2.png')} style={styles.logo} />
            <Text style={styles.featureText}>Labur.ar Plus</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Professional Profile</Text>
          <Text style={styles.percentageComplete}>+33%</Text>
        </View>
        <ProfileItem icon="briefcase-outline" label="Portfolio" />
        <ProfileItem icon="construct-outline" label="Featured skills" />
        <ProfileItem icon="person-outline" label="Personal description" />
        <ProfileItem icon="people-outline" label="Recommendations" />
        <ProfileItem icon="bulb-outline" label="Objectives & ambitions" />

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Experience and Training</Text>
          <Text style={styles.percentageComplete}>+33%</Text>
        </View>
        <ProfileItem icon="wallet-outline" label="Professional Interests" />
        <ProfileItem icon="diamond-outline" label="Work Experience" />
        <ProfileItem icon="school-outline" label="Education" />
        <ProfileItem icon="language-outline" label="Spoken Languagues" />

        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Work Preferences</Text>
          <Text style={styles.percentageComplete}>+33%</Text>
        </View>
        <ProfileItem icon="bar-chart-outline" label="Positions of Interests" />
        <ProfileItem icon="cash-outline" label="Salary Expectations" />
        <ProfileItem icon="car-sport-outline" label="Availability to move" />
        <ProfileItem icon="location-outline" label="Location" />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileItem = ({ icon, label }) => (
  <View style={styles.profileItem}>
    <Ionicons name={icon} size={24} color="#666" />
    <Text style={styles.profileItemText}>{label}</Text>
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>Add</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  completionOverlay: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#FF4081',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  completionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  profession: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  whiteRectangle: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  followingButton: {
    backgroundColor: '#e0e0e0',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: '#666',
  },
  iconButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffcccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconLabel: {
    fontSize: 12,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  percentageComplete: {
    fontSize: 16,
    color: '#ff4d4d',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ffcccc',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  addButtonText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderColor: '#ff4d4d',
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 40,
  },
  logoutButtonText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;