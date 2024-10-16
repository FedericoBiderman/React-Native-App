import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profiles = [
  { id: '1', name: 'Emilia', image: require('../../assets/profile1.png') },
  { id: '2', name: 'Carolina', image: require('../../assets/profile3.png') },
  { id: '3', name: 'Raul', image: require('../../assets/profile24.png') },
  { id: '4', name: 'Eduardo', image: require('../../assets/profile15.png') },
  { id: '5', name: 'Ariel', image: require('../../assets/profile12.png') },
  { id: '6', name: 'Julieta', image: require('../../assets/profile20.png') },
];

const matches = [
  { id: '1', name: 'Luis', message: 'Estoy interesado en el trabajo', image: require('../../assets/profile18.png') },
  { id: '2', name: 'Federico', message: '¿Cuándo arranco?', image: require('../../assets/profile13.png') },
  { id: '3', name: 'Facundo', message: '¿Tengo el laburo?', image: require('../../assets/profile11.png') },
  { id: '4', name: 'Matias', message: 'El lunes no puedo arrancar', image: require('../../assets/profile10.png') },
  { id: '5', name: 'Pablo', message: 'El viernes tengo tiempo', image: require('../../assets/profile9.png') },
  { id: '6', name: 'Mateo', message: 'Creo que puedo aportar a la empresa', image: require('../../assets/profile14.png') },
];

const ChatScreen = () => {
  const navigation = useNavigation();

  const renderProfileItem = ({ item }) => (
    <View style={styles.profileContainer}>
      <Image source={item.image} style={styles.profileImage} />
      <Text style={styles.profileName}>{item.name}</Text>
    </View>
  );

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchContainer}
      onPress={() => navigation.navigate('PrivateChatScreen', { chatName: item.name })}
    >
      <Image source={item.image} style={styles.matchImage} />
      <View style={styles.matchTextContainer}>
        <Text style={styles.matchName}>{item.name}</Text>
        <Text style={styles.matchMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Matcheos</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8e8e93" style={styles.searchIcon} />
          <Text style={styles.searchText}>Buscar Match</Text>
        </View>

        {/* Scrollable Profile List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.profileList}
          data={profiles}
          renderItem={renderProfileItem}
          keyExtractor={(item) => item.id}
        />

        {/* Matches List */}
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
          style={styles.matchList}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="home-outline" size={24} color="#8e8e93" />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFBF00" />
          <Text style={[styles.tabText, styles.activeTabText]}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search-outline" size={24} color="#8e8e93" />
            <Text style={styles.tabText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('PickerProfileScreen')}>
            <Ionicons name="person-outline" size={24} color="#8e8e93" />
            <Text style={styles.tabText}>Perfil</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121b22',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1f2c34',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a3942',
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    color: '#8e8e93',
    fontSize: 16,
  },
  profileList: {
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    borderColor: '#00a884',
  },
  profileName: {
    marginTop: 4,
    fontSize: 12,
    color: '#fff',
  },
  matchList: {
    paddingHorizontal: 12,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a3942',
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
    marginBottom: 4,
  },
  matchMessage: {
    fontSize: 14,
    color: '#8e8e93',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1f2c34',
    paddingVertical: 8,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#8e8e93',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#FFBF00',
    paddingTop: 8,
  },
  activeTabText: {
    color: '#FFBF00',
    fontWeight: 'bold',
  },
});

export default ChatScreen;