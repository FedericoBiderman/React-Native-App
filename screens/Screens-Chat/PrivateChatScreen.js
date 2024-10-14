import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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

  const renderItem = ({ item }) => {
    const isMyMessage = item.sender === "me";
    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
        ]}
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={require('./../../assets/profile16.png')}
          style={styles.profilePic}
        />
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
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color="#757575" />
          </TouchableOpacity>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your message here..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons name="bookmark-outline" size={24} color="#757575" />
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
  attachButton: {
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
    backgroundColor: '#00E676',
    padding: 10,
    borderRadius: 50,
  },
  bookmarkButton: {
    padding: 5,
  },
});

export default PrivateChatScreen;