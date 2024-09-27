import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
    { id: 1, name: 'Pediatrist', image: require('../../assets/pediatrist.png') },
    { id: 2, name: 'Lawyer', image: require('../../assets/lawyer.png') },
    { id: 3, name: 'Veterinary', image: require('../../assets/veterinary.png') },
    { id: 4, name: 'Teacher', image: require('../../assets/teacher.png') },
    { id: 5, name: 'Data scientist', image: require('../../assets/data-scientist.png') },
    { id: 6, name: 'Architect', image: require('../../assets/architect.png') },
    { id: 7, name: 'Cybersecurity specialist', image: require('../../assets/cybersecurity-specialist.png') },
    { id: 8, name: 'Economist', image: require('../../assets/economist.png') },
    { id: 9, name: 'Journalist', image: require('../../assets/journalist.png') },
    { id: 10, name: 'Mechanical enginner', image: require('../../assets/mechanical-enginner.png') },
    { id: 11, name: 'Mobile application developer', image: require('../../assets/Mobile-application.png') },
    { id: 12, name: 'Blockchain developer', image: require('../../assets/blockchain-developer.png') },
    { id: 13, name: 'Biologist', image: require('../../assets/biologist.png') },
    { id: 14, name: 'IoT', image: require('../../assets/IoT.png') },
    { id: 15, name: 'Community mannager', image: require('../../assets/community-manager.png') },
    { id: 16, name: 'Videogames developer', image: require('../../assets/videogames-developer.png') },
    { id: 17, name: 'Counter', image: require('../../assets/counter.png') },
    { id: 18, name: 'Robotics', image: require('../../assets/robotics.png') },
    { id: 19, name: 'Biotechnologist', image: require('../../assets/biotechnologist.png') },
    { id: 20, name: 'Artificial intelligence specialist', image: require('../../assets/IA.png') },
    { id: 21, name: 'Psychologist', image: require('../../assets/psychologist.png') },
    { id: 22, name: 'Cloud infrastructure enginner', image: require('../../assets/cloud.png') },
    { id: 23, name: 'Software enginner', image: require('../../assets/software-enginner.png') },
    { id: 24, name: 'FrontEnd developer', image: require('../../assets/FrontEnd.png') },
    { id: 25, name: 'Civil enginner', image: require('../../assets/civil-enginner.png') },

];

const profiles = [
    { id: 1, name: 'Martina Gomez', image: require('../../assets/profile1.png'), category: 'Doctor', rating: 4.8, distance: 2.5 },
    { id: 2, name: 'Jimmy Fallon', image: require('../../assets/profile2.png'), category: 'Entrepreneurship', rating: 4.5, distance: 3.7 },
    { id: 3, name: 'Emily Smith', image: require('../../assets/profile3.png'), category: 'Marketing', rating: 4.9, distance: 1.8 },
];

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                        <View style={styles.userInfo}>
                            <Text style={styles.headerText}>Hola, Federico</Text>
                            <Ionicons name="chevron-forward" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate("NotificationsScreen")} style={styles.iconButton}>
                            <Ionicons name="notifications-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={styles.iconButton}>
                            <Ionicons name="settings-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("HelpScreen")} style={styles.iconButton}>
                            <Text style={styles.helpText}>Ayuda</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="gray" />
                    <Text style={styles.searchText}>¿Que estás buscando?</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Categorías</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("AllCategoriesScreen")}>
                        <Text style={styles.seeMoreText}>Ver más</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryItem}
                            onPress={() => navigation.navigate("CategoryDetailScreen", { category })}
                        >
                            <Image source={category.image} style={styles.categoryImage} />
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Perfiles destacados</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profilesContainer}>
                    {profiles.map((profile) => (
                        <View key={profile.id} style={styles.profileCard}>
                            <TouchableOpacity onPress={() => navigation.navigate("MatchScreen", { profile })}>
                                <Image source={profile.image} style={styles.profileImage} />
                            </TouchableOpacity>
                            <View style={styles.profileInfo}>
                                <View style={styles.nameAndPhotoContainer}>
                                    <Text style={styles.profileName}>{profile.name}</Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("ProfileScreen", { profile })}
                                    >
                                        <Image source={profile.image} style={styles.profileThumbnail} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.profileCategory}>{profile.category}</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star-half" size={16} color="#FFD700" />
                                    <Text style={styles.ratingText}>{profile.rating}</Text>
                                </View>
                                <Text style={styles.distanceText}>{profile.distance} km</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="home-outline" size={24} color="black" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                    <Text style={styles.tabText}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="search-outline" size={24} color="black" />
                    <Text style={styles.tabText}>Buscar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="person-outline" size={24} color="black" />
                    <Text style={styles.tabText}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 70, // Para dar espacio al tab bar
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 8,
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        marginLeft: 16,
    },
    helpText: {
        color: "blue",
        fontSize: 16,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    searchText: {
        marginLeft: 10,
        color: "gray",
    },
    sectionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    seeMoreText: {
        color: "blue",
        fontSize: 16,
    },
    categoriesContainer: {
        paddingLeft: 16,
        marginBottom: 24,
    },
    categoryItem: {
        marginRight: 16,
        alignItems: "center",
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    categoryName: {
        marginTop: 8,
        textAlign: "center",
    },
    profilesContainer: {
        paddingLeft: 16,
    },
    profileCard: {
        width: 280,
        marginRight: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 12,
        overflow: "hidden",
    },
    profileImage: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    profileInfo: {
        padding: 16,
    },
    nameAndPhotoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    profileThumbnail: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 16,
    },
    distanceText: {
        fontSize: 14,
        color: "gray",
    },
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        paddingVertical: 8,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        alignItems: "center",
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
    },
    
});

export default HomeScreen;