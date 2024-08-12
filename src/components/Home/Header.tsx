import { useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
const Header = () => {
  const { user } = useUser();
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.subText}>Welcome,</Text>
        <Text style={styles.text}>{user?.fullName}</Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  subText: {
    fontFamily: "Regular",
    fontSize: moderateScale(14),
  },
  text: {
    fontFamily: "Medium",
    fontSize: moderateScale(19),
  },
  image: {
    width: moderateScale(45),
    aspectRatio: 1,
    borderRadius: moderateScale(25),
  },
});
