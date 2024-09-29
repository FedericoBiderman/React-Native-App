import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, PanResponder, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ROTATION_MAGNITUDE = 15;
const SWIPE_THRESHOLD = 120;

const profiles = [
    {
        id: 1,
        name: 'Alicia',
        age: 25,
        image: require('./../../assets/profile13.png'),
        bio: 'Programmer | Full-Stack',
        location: 'Argentina',
        preferences: ['UBA', 'Ingles', 'Programmer', 'Full-Stack', 'Titulo de grado', 'Argentina'],
        rating: 4.8,
        recentlyActive: true
    },
    {
        id: 2,
        name: 'Paul',
        age: 26,
        image: require('./../../assets/profile14.png'),
        bio: 'Web Developer | Front-End',
        location: 'Alemania',
        preferences: ['Stanford', 'Aleman y español', 'Web Developer', 'Front-End', 'Sigo estudiando', 'Alemania'],
        rating: 4.9,
        recentlyActive: false
    },
    {
        id: 3,
        name: 'Jose',
        age: 22,
        image: require('./../../assets/profile15.png'),
        bio: 'Application Developer | Back-End',
        location: 'Mexico',
        preferences: ['UNAM', 'Español y Frances', 'Application Developer', 'Back-End', 'Titulo de grado', 'Mexico'],
        rating: 4.8,
        recentlyActive: true
    },
    {
        id: 4,
        name: 'Summer',
        age: 23,
        image: require('./../../assets/profile16.png'),
        bio: 'Desktop Programmer | Full-Stack',
        location: 'Gran Bretaña',
        preferences: ['Oxford', 'Ingles y español', 'Desktop Programmer', 'Full-Stack', 'Titulo de grado', 'Gran Bretaña'],
        rating: 4.9,
        recentlyActive: true
    },
    // ... add more profiles with the same structure
];

const MatchScreen = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMatch, setShowMatch] = useState(false);
    const [message, setMessage] = useState('');
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            tiltSign.setValue(y0 > height / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > SWIPE_THRESHOLD;

            if (isActionActive) {
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * 500,
                        y: dy,
                    },
                    useNativeDriver: true,
                }).start(() => removeTopCard(direction));
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });

    const removeTopCard = (direction) => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        swipe.setValue({ x: 0, y: 0 });
        if (direction === 1) { // Swipe right or checkmark
            setShowMatch(true);
        }
    };

    const handleLikePress = () => {
        Animated.timing(swipe, {
            toValue: { x: 500, y: 0 },
            duration: 200,
            useNativeDriver: true,
        }).start(() => removeTopCard(1));
    };

    const handleNopePress = () => {
        Animated.timing(swipe, {
            toValue: { x: -500, y: 0 },
            duration: 200,
            useNativeDriver: true,
        }).start(() => removeTopCard(-1));
    };

    const handleSendMessage = () => {
        navigation.navigate('ChatScreen', {
            matchName: profiles[currentIndex - 1].name,
            initialMessage: message
        });
        setShowMatch(false);
        setMessage('');
    };

    const renderCards = () => {
        return profiles
            .map((profile, index) => {
                if (index < currentIndex) {
                    return null;
                }

                if (index === currentIndex) {
                    return (
                        <Animated.View
                            key={profile.id}
                            style={[
                                styles.card,
                                {
                                    transform: [
                                        {
                                            rotate: swipe.x.interpolate({
                                                inputRange: [-width / 2, 0, width / 2],
                                                outputRange: [
                                                    `${ROTATION_MAGNITUDE * -1}deg`,
                                                    '0deg',
                                                    `${ROTATION_MAGNITUDE}deg`,
                                                ],
                                            }),
                                        },
                                        ...swipe.getTranslateTransform(),
                                    ],
                                },
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <Image source={profile.image} style={styles.cardImage} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.9)']}
                                style={styles.cardGradient}
                            >
                                <Text style={styles.cardName}>{profile.name}, {profile.age}</Text>
                                <Text style={styles.cardBio}>{profile.bio}</Text>
                                <View style={styles.cardPreferences}>
                                    {profile.preferences.map((pref, index) => (
                                        <View key={index} style={styles.preferenceTag}>
                                            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.preferenceIcon} />
                                            <Text style={styles.preferenceText}>{pref}</Text>
                                        </View>
                                    ))}
                                </View>
                                {profile.recentlyActive && (
                                    <View style={styles.recentlyActiveContainer}>
                                        <Text style={styles.recentlyActiveText}>Recently Active</Text>
                                    </View>
                                )}
                                <View style={styles.emojiContainer}>
                                    <Text style={styles.emojiText}>🎓🇦🇷💻</Text>
                                </View>
                            </LinearGradient>
                        </Animated.View>
                    );
                }

                return (
                    <View key={profile.id} style={[styles.card, { zIndex: -index }]}>
                        <Image source={profile.image} style={styles.cardImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.9)']}
                            style={styles.cardGradient}
                        >
                            <Text style={styles.cardName}>{profile.name}, {profile.age}</Text>
                            <Text style={styles.cardBio}>{profile.bio}</Text>
                            <View style={styles.cardPreferences}>
                                {profile.preferences.map((pref, index) => (
                                    <View key={index} style={styles.preferenceTag}>
                                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.preferenceIcon} />
                                        <Text style={styles.preferenceText}>{pref}</Text>
                                    </View>
                                ))}
                            </View>
                            {profile.recentlyActive && (
                                <View style={styles.recentlyActiveContainer}>
                                    <Text style={styles.recentlyActiveText}>Recently Active</Text>
                                </View>
                            )}
                            <View style={styles.emojiContainer}>
                                <Text style={styles.emojiText}>🎓🇦🇷💻</Text>
                            </View>
                        </LinearGradient>
                    </View>
                );
            })
            .reverse();
    };

    const renderMatchScreen = () => (
        <View style={styles.matchOverlay}>
            <Text style={styles.matchText}>It's a Match!</Text>
            <Text style={styles.matchSubText}>
                You and {profiles[currentIndex - 1].name} have liked each other.
            </Text>
            <TextInput
                style={styles.messageInput}
                placeholder="Send a message..."
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={32} color="#FF6F61" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Discover</Text>
                <TouchableOpacity>
                    <Ionicons name="filter" size={32} color="#FF6F61" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>{renderCards()}</View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomBarButton} onPress={handleNopePress}>
                    <Ionicons name="arrow-undo" size={30} color="#F2B721" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={handleNopePress}>
                    <Ionicons name="close" size={30} color="#FF6F61" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={handleLikePress}>
                    <Ionicons name="star" size={30} color="#27AAE4" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={handleLikePress}>
                    <Ionicons name="checkmark" size={30} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={handleLikePress}>
                    <Ionicons name="arrow-redo" size={30} color="#A34FDB" />
                </TouchableOpacity>
            </View>
            {showMatch && renderMatchScreen()}
        </SafeAreaView>
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
        padding: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6F61',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        width: width * 0.9,
        height: height * 0.7,
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 20,
    },
    cardName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    cardBio: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
    },
    cardPreferences: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    preferenceTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    preferenceIcon: {
        marginRight: 5,
    },
    preferenceText: {
        color: 'white',
        fontSize: 14,
    },
    recentlyActiveContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    recentlyActiveText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emojiContainer: {
        marginTop: 10,
    },
    emojiText: {
        fontSize: 24,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    bottomBarButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    matchOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    matchSubText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    messageInput: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
    },
    sendButton: {
        backgroundColor: '#FF6F61',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 25,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MatchScreen;


