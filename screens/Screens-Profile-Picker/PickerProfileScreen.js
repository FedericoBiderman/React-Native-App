import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PickerProfileScreen = () => {
  const navigation = useNavigation();

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

  const renderIconButton = (iconName, label, onPress) => (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
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

          <View style={styles.iconButtonsRow}>
            {renderIconButton('shield-checkmark', 'SAFETY', () => {})}
            {renderIconButton('pencil', 'EDIT PROFILE', () => {})}
            {renderIconButton('camera', 'ADD MEDIA', () => {})}
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

        {/* More profile items */}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Style definitions (unchanged from your code)
});

export default PickerProfileScreen;
