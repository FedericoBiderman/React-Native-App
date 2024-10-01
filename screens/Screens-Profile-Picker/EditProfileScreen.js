import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [profileCompletion, setProfileCompletion] = useState(26);
  const [profileData, setProfileData] = useState({
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
  });

  const navigation = useNavigation();


  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleEdit = () => {
    // Aquí puedes implementar la lógica de confirmación de edición del perfil.
    alert('Perfil actualizado correctamente');
  };

  const openAddModal = (section) => {
    setCurrentSection(section);
    setModalVisible(true);
  };

  const handleSaveSection = () => {
    // Actualiza los datos del perfil con la nueva información ingresada
    const updatedProfile = { ...profileData, [currentSection]: newInfo };
    setProfileData(updatedProfile);

    // Calcula el nuevo porcentaje de completado (esto puede depender de cuántas secciones estén completas)
    const filledSections = Object.values(updatedProfile).filter(value => value !== '').length;
    const totalSections = Object.keys(updatedProfile).length;
    const newCompletion = (filledSections / totalSections) * 100;
    setProfileCompletion(newCompletion);
    
    // Cierra el modal
    setModalVisible(false);
  };

  const renderIconButton = (iconName, label, onPress) => (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Ionicons name={iconName} size={24} color="#ff4d4d" />
      </View>
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );
  const [newInfo, setNewInfo] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          <Image source={profileData.imageUrl} style={styles.profileImage} />
          <View style={styles.completionOverlay}>
            <Text style={styles.completionText}>{`${profileCompletion}% COMPLETE`}</Text>
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
            {renderIconButton('shield-checkmark', 'SAFETY')}
            {renderIconButton('pencil', 'EDIT PROFILE')}
            {renderIconButton('camera', 'ADD MEDIA')}
          </View>
        </View>

        <ProfileSection 
          title="Professional Profile" 
          percentage="+33%" 
          items={[
            { label: 'Portfolio', value: profileData.portfolio },
            { label: 'Featured skills', value: profileData.featuredSkills },
            { label: 'Personal description', value: profileData.personalDescription },
            { label: 'Recommendations', value: profileData.recommendations },
            { label: 'Objectives & ambitions', value: profileData.objectives }
          ]}
          onAdd={openAddModal}
        />

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

        {/* Modal para añadir información */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add {currentSection}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${currentSection}...`}
              value={newInfo}
              onChangeText={setNewInfo}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveSection}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileSection = ({ title, percentage, items, onAdd }) => (
  <View style={styles.profileSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.percentageComplete}>{percentage}</Text>
    </View>
    {items.map((item, index) => (
      <ProfileItem key={index} label={item.label} value={item.value} onAdd={() => onAdd(item.label)} />
    ))}
  </View>
);

const ProfileItem = ({ label, value, onAdd }) => (
  <View style={styles.profileItem}>
    <Text style={styles.profileItemText}>{label}</Text>
    {value ? (
      <Text style={styles.profileItemValue}>{value}</Text>
    ) : (
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    )}
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    marginLeft: 5,
    color: '#EC5D71',
    fontWeight: 'bold',
    fontSize: 22,
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
  profileSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 16,
  },
  profileItemValue: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#33DEF0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;