import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/profile1.png')} // Add profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.percentage}>26% COMPLETE</Text>
      </View>
      
      <Text style={styles.name}>Martina</Text>
      <Text style={styles.profession}>Medica y Neurocirujana</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SAFETY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>EDIT PROFILE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addMediaButton}>
          <Text style={styles.addMediaText}>ADD MEDIA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Professional Profile</Text>
          <Text style={styles.detailValue}>+33%</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Show portfolio</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  percentage: {
    marginTop: 10,
    fontSize: 16,
    color: '#ff4d4d',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  profession: {
    fontSize: 16,
    color: '#999',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#e6e6e6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addMediaButton: {
    backgroundColor: '#ffcccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addMediaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff4d4d',
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#ff4d4d',
  },
  addButton: {
    backgroundColor: '#ffcccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addText: {
    fontSize: 14,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
