import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const PickerProfileScreen = () => {
  const navigation = useNavigation();
  const [followersModalVisible, setFollowersModalVisible] = useState(false);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const handleAddMedia = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera was denied.");
      return;
    }
    await ImagePicker.launchCameraAsync();
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  // Sample profile data
  const profileData = {
    imageUrl: require('./../../assets/ibm.png'),
    name: 'International Business Machines (IBM)',
    profession: 'IT Consulting and Technology Services',
    completionPercentage: 0,
    followers: 2500,
    following: 350,
    location: 'Buenos Aires, Argentina',
    companyType: 'Multinational',
    specialization: 'Artificial Intelligence, Cloud Computing',
    targetAudience: 'Medium and Large Enterprises',
    localLocation: 'Microcentro, Buenos Aires',
  };

  const renderIconButton = (iconName, label, onPress) => (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Ionicons name={iconName} size={24} color="#ff4d4d" />
      </View>
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderModal = (visible, setVisible, title, count) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalCount}>{count}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile Picker</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image source={profileData.imageUrl} style={styles.profileImage} />
          <View style={styles.completionOverlay}>
            <Text style={styles.completionText}>{`${profileData.completionPercentage}% COMPLETE`}</Text>
          </View>
        </View>

        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.profession}>{profileData.profession}</Text>

        {/* Statistics */}
        <View style={styles.whiteRectangle}>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statItem} onPress={() => setFollowersModalVisible(true)}>
              <Text style={styles.statNumber}>{profileData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={() => setFollowingModalVisible(true)}>
              <Text style={styles.statNumber}>{profileData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons inside the white rectangle */}
          <View style={styles.iconButtonsRow}>
            {renderIconButton('shield-checkmark', 'SAFETY')}
            {renderIconButton('pencil', 'EDIT PROFILE', handleEditProfile)}
            {renderIconButton('camera', 'ADD MEDIA', handleAddMedia)}
          </View>
        </View>

        {/* Additional Sections */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ProfileItem icon="camera-outline" label="Photos of your company" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <ProfileItem icon="play-circle-outline" label="Video of your company" />
          <ProfileItem icon="construct-outline" label="Company specialization" />
          <ProfileItem icon="people-outline" label="Number of Employees" />
          <ProfileItem icon="location-outline" label="Location of the company" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description of the company</Text>
          <ProfileItem icon="briefcase-outline" label="Brief description of your company" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <ProfileItem icon="wallet-outline" label="Benefits offered by the company" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Job Requirements</Text>
          <ProfileItem icon="diamond-outline" label="Required experience" />
          <ProfileItem icon="school-outline" label="Required education" />
          <ProfileItem icon="language-outline" label="Required languages" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Team and Work environment</Text>
          <ProfileItem icon="people-circle-outline" label="Team dynamics and work environment" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          <ProfileItem icon="medal-outline" label="Important company projects" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Employee Testimonials</Text>
          <ProfileItem icon="people-outline" label="Employee opinions and experiences" />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderModal(followersModalVisible, setFollowersModalVisible, "Followers", profileData.followers)}
      {renderModal(followingModalVisible, setFollowingModalVisible, "Following", profileData.following)}
    </SafeAreaView>
  );
};

const ProfileItem = ({ icon, label }) => (
  <View style={styles.profileItem}>
    <Ionicons name={icon} size={24} color="#666" />
    <Text style={styles.profileItemText}>{label}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 5,
  },
  completionOverlay: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#FF4081',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 4,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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
  whiteRectangle: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
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
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 16,
    marginLeft: 10, // Añado margen a la izquierda para separación
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PickerProfileScreen;
