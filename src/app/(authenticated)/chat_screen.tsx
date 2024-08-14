import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const ChatScreen = () => {
  const { chatId }: { chatId: string } = useLocalSearchParams();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const { user } = useUser();
  const navigation = useNavigation();

  const getUserInfo = async () => {
    try {
      const docRef = doc(db, "pet_chats", chatId);
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();
      const otherUser = data.users.find((item) => item.id !== user?.id);
      navigation.setOptions({ title: otherUser.name });
    } catch (error) {
      console.log(error);
    }
  };

  const onSend = useCallback(
    async (messages: IMessage[] = []) => {
      const messageToSend = {
        ...messages[0],
        createdAt: new Date(),
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [messageToSend])
      );

      await addDoc(
        collection(db, "pet_chats", chatId, "messages"),
        messageToSend
      );
    },
    [chatId]
  );

  useEffect(() => {
    if (!chatId) return;

    getUserInfo();

    const messagesQuery = collection(db, "pet_chats", chatId, "messages");
    const orderedMessagesQuery = query(
      messagesQuery,
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(orderedMessagesQuery, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as IMessage;
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showUserAvatar={true}
        user={{
          _id: user?.id,
          avatar: user?.imageUrl,
          name: user?.fullName,
        }}
        infiniteScroll
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
