import { Colors } from "@/constants/colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text style={styles.text}>{user?.firstName}</Text>
      <Text style={styles.subText}>{user?.emailAddresses[0].emailAddress}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginTop: moderateScale(20),
          backgroundColor: Colors.primary,
          padding: moderateScale(10),
          borderRadius: moderateScale(10),
          width: "100%",
          elevation: 1,
        }}
        onPress={() => router.push("/my_posts")}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.white,
            fontFamily: "Medium",
            fontSize: moderateScale(18),
          }}
        >
          My Posts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginTop: moderateScale(20),
          backgroundColor: Colors.light_gray,
          padding: moderateScale(10),
          borderRadius: moderateScale(10),
          width: "100%",
          elevation: 1,
        }}
        onPress={() => signOut()}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.white,
            fontFamily: "Medium",
            fontSize: moderateScale(18),
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(10),
  },
  image: {
    width: moderateScale(100),
    aspectRatio: 1,
    borderRadius: moderateScale(50),
  },
  text: {
    fontFamily: "Bold",
    fontSize: moderateScale(20),
    marginTop: moderateScale(5),
  },
  subText: {
    fontFamily: "Regular",
    fontSize: moderateScale(16),
    color: Colors.gray,
  },
});
