import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function PrivateChatScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: "1", text: "Hola, ¿cómo estás?", sender: "other", time: "8:30pm" },
    { id: "2", text: "Todo bien, ¿y tú?", sender: "me", time: "8:33pm" },
    { id: "3", text: "Igual, gracias.", sender: "other", time: "8:36pm" },
    { id: "4", text: "Qué bueno, ¿has hecho algo interesante hoy?", sender: "me", time: "8:38pm" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bookmarkAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        id: Math.random().toString(),
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Animated.timing(bookmarkAnimation, {
      toValue: isBookmarked ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => {
    const isMyMessage = item.sender === "me";
    return (
      <View
        style={[styles.messageContainer, isMyMessage ? styles.myMessage : styles.otherMessage]}
      >
        <Text style={[styles.messageText, isMyMessage ? styles.myMessageText : styles.otherMessageText]}>
          {item.text}
        </Text>
        <Text style={[styles.timeText, isMyMessage ? styles.myTimeText : styles.otherTimeText]}>
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={require('./../../assets/profile16.png')} style={styles.profilePic} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Anil</Text>
          <Text style={styles.headerStatus}>Online - Last seen 7:02pm</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="call" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {isBookmarked && (
        <Animated.View style={[styles.bookmarkBanner, { opacity: bookmarkAnimation }]}>
          <Text style={styles.bookmarkBannerText}>Saved chat to your bookmarks list</Text>
          <TouchableOpacity onPress={() => navigation.navigate("BookmarksScreen")}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((item) => renderItem({ item }))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={24} color="#757575" />
          </TouchableOpacity>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message here..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={28} 
              color={isBookmarked ? "#4285F4" : "#757575"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerStatus: {
    fontSize: 12,
    color: '#757575',
  },
  headerIcon: {
    marginLeft: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: "#fff",
  },
  otherMessageText: {
    color: "#000",
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 5,
  },
  myTimeText: {
    color: "#fff",
  },
  otherTimeText: {
    color: "#666",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  emojiButton: {
    padding: 5,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  textInput: {
    flex: 1,
    padding: 8,
  },
  sendButton: {
    padding: 8,
    borderRadius: 50,
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  bookmarkBannerText: {
    color: '#185ABC',
  },
  viewText: {
    color: '#1A73E8',
    fontWeight: 'bold',
  },
});

export default PrivateChatScreen;