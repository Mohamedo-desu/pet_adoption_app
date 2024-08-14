import AboutPet from "@/components/pet/AboutPet";
import OwnerInfo from "@/components/pet/OwnerInfo";
import PetInfo from "@/components/pet/PetInfo";
import PetSubInfo from "@/components/pet/PetSubInfo";
import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { deleteUserPosts } from "@/shared/Shared";
import { PETPROPS } from "@/types/pet";
import { generateChatId } from "@/utils/functions";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

const PetDetails = () => {
  const { item }: { item: string } = useLocalSearchParams();
  if (!item) return null;

  const [loading, setLoading] = useState(false);

  const pet: PETPROPS = JSON.parse(item);

  const { user } = useUser();
  const router = useRouter();

  const initiateChat = async () => {
    try {
      setLoading(true);
      if (!user?.id || !pet?.user?.userId) {
        throw new Error("User or pet information is missing.");
      }

      const userId = user?.id;
      const petUserId = pet.user.userId;

      const chatId = await generateChatId(userId, petUserId);

      const chatDocRef = doc(db, "pet_chats", chatId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
        const newChatData = {
          id: chatId,
          userIds: [userId, petUserId],
          users: [
            {
              id: userId,
              imageUrl: user?.imageUrl,
              name: user?.fullName,
            },
            {
              id: petUserId,
              imageUrl: pet.user.userImage,
              name: pet.user.userName,
            },
          ],
        };

        await setDoc(chatDocRef, newChatData);
        setLoading(false);
        router.push({
          pathname: "/chat_screen",
          params: { chatId },
        });
      } else {
        setLoading(false);
        router.push({
          pathname: "/chat_screen",
          params: { chatId },
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const deletePost = async (postId: string) => {
    try {
      Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setLoading(true);
            await deleteUserPosts(postId);
            setLoading(false);
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: moderateScale(100) }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        {user?.id !== pet?.user?.userId ? (
          <TouchableOpacity
            style={styles.adoptMeBtn}
            onPress={initiateChat}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color={Colors.white} />
            ) : (
              <Text style={styles.adoptMeBtnText}>Adopt Me</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.adoptMeBtn, { backgroundColor: Colors.red }]}
            onPress={() => deletePost(pet.id)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color={Colors.white} />
            ) : (
              <Text style={styles.adoptMeBtnText}>Delete</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
export default PetDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomContainer: {},
  adoptMeBtn: {
    padding: moderateScale(10),
    backgroundColor: Colors.primary,
  },
  adoptMeBtnText: {
    fontFamily: "Medium",
    textAlign: "center",
    fontSize: moderateScale(18),
    color: Colors.white,
  },
});
