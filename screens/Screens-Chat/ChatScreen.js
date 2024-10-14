import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const profiles = [
  { id: '1', name: 'Emilia', image: 'https://example.com/emilia.jpg' },
  { id: '2', name: 'Carolina', image: 'https://example.com/carolina.jpg' },
  { id: '3', name: 'Raul', image: 'https://example.com/raul.jpg' },
  { id: '4', name: 'Eduardo', image: 'https://example.com/eduardo.jpg' },
  { id: '5', name: 'Ariel', image: 'https://example.com/ariel.jpg' },
  { id: '6', name: 'Julieta', image: 'https://example.com/julieta.jpg' },
];

const matches = [
  { id: '1', name: 'Luis', message: 'Estoy interesado en el trabajo', image: 'https://example.com/luis.jpg' },
  { id: '2', name: 'Federico', message: '¿Cuándo arranco?', image: 'https://example.com/federico.jpg' },
  { id: '3', name: 'Facundo', message: '¿Tengo el laburo?', image: 'https://example.com/facundo.jpg' },
  { id: '4', name: 'Matias', message: 'El lunes no puedo arrancar', image: 'https://example.com/matias.jpg' },
  { id: '5', name: 'Pablo', message: 'El viernes tengo tiempo', image: 'https://example.com/pablo.jpg' },
  { id: '6', name: 'Mateo', message: 'Creo que puedo aportar a la empresa', image: 'https://example.com/mateo.jpg' },
];

const ChatScreen = ({ navigation }) => {
  const renderProfileItem = ({ item }) => (
    <View style={styles.profileContainer}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <Text style={styles.profileName}>{item.name}</Text>
    </View>
  );

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchContainer}
      onPress={() => navigation.navigate('PrivateChatScreen', { chatName: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.matchImage} />
      <View style={styles.matchTextContainer}>
        <Text style={styles.matchName}>{item.name}</Text>
        <Text style={styles.matchMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista Matcheos</Text>
        <TouchableOpacity style={styles.goHomeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.goHomeText}>Go Home</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Profile List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileList}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.profileContainer}>
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Matches List */}
      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id}
        style={styles.matchList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goHomeButton: {
    backgroundColor: '#b96f6f',
    padding: 10,
    borderRadius: 20,
  },
  goHomeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileList: {
    marginVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#ff4d4d',
  },
  profileName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  matchList: {
    marginTop: 10,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  matchImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  matchTextContainer: {
    flex: 1,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  matchMessage: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ChatScreen;
