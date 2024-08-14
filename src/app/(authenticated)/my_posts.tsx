import ListEmpty from "@/components/ListEmpty";
import PetCard from "@/components/pet/PetCard";
import { Colors } from "@/constants/colors";
import { deleteUserPosts, getUserPosts } from "@/shared/Shared";
import { PETPROPS } from "@/types/pet";
import { useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
const MyPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<PETPROPS[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);

      const result = await getUserPosts(user?.id);
      if (!result || result.length <= 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      setPosts(result);

      setLoading(false);
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
            getPosts();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderItem = useCallback(({ item }: { item: PETPROPS }) => {
    if (!item) return null;

    return (
      <View style={styles.itemContainer}>
        <PetCard item={item} />

        <Pressable style={styles.deleteBtn} onPress={() => deletePost(item.id)}>
          <Text
            style={{
              color: Colors.white,
              fontFamily: "Regular",
              fontSize: moderateScale(14),
            }}
          >
            Delete
          </Text>
        </Pressable>
      </View>
    );
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <ListEmpty data={posts} loading={loading} text={"You have no posts"} />
    );
  }, [loading, posts]);

  useEffect(() => {
    user?.id && getPosts();
  }, [user]);

  return (
    <FlatList
      refreshing={loading}
      onRefresh={() => getPosts()}
      data={posts}
      numColumns={2}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      style={styles.container}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.contentContainerStyle}
      columnWrapperStyle={{ gap: moderateScale(5) }}
    />
  );
};
export default MyPosts;
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
  itemContainer: {
    flexDirection: "column",
    gap: moderateScale(5),
  },
  deleteBtn: {
    backgroundColor: Colors.red,
    padding: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
  },
});
