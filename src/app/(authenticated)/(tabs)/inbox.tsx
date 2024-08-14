import ChatCard from "@/components/chat/ChatCard";
import ListEmpty from "@/components/ListEmpty";
import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { CHATCARDPROPS } from "@/types/pet";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
const Inbox = () => {
  const [chats, setChats] = useState<CHATCARDPROPS[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const getUserChatList = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "pet_chats"),
        where("userIds", "array-contains", user?.id)
      );

      const snapShot = await getDocs(q);

      const chats = snapShot.docs.map((doc) => doc.data());

      const chatLists: any[] = [];

      chats.forEach((chat) => {
        const otherUser = chat.users.find((item) => item.id !== user?.id);
        const result = {
          chatId: chat.id,
          ...otherUser,
        };
        chatLists.push(result);
      });

      setChats(chatLists);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderItem = useCallback(({ item }: { item: CHATCARDPROPS }) => {
    if (!item) return null;

    return <ChatCard item={item} />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <ListEmpty data={chats} loading={loading} text={"Your inbox is empty"} />
    );
  }, [loading, chats]);

  useEffect(() => {
    user && getUserChatList();
  }, [user]);
  return (
    <FlatList
      refreshing={loading}
      onRefresh={() => getUserChatList()}
      data={chats}
      keyExtractor={(item) => item.chatId}
      renderItem={renderItem}
      style={styles.container}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};
export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: moderateScale(10),
  },

  contentContainerStyle: {
    gap: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
});
