import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
const OwnerInfo = ({ pet }: { pet: PETPROPS }) => {
  return (
    <View style={styles.container}>
      <View style={styles.owner}>
        <Image source={{ uri: pet.user.userImage }} style={styles.image} />
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {pet.user.userName}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            Pet Owner
          </Text>
        </View>
      </View>
    </View>
  );
};
export default OwnerInfo;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(10),
    gap: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 15,
    padding: moderateScale(10),
    backgroundColor: Colors.light_gray,
    borderColor: Colors.primary,
  },
  image: {
    width: moderateScale(50),
    aspectRatio: 1,
    borderRadius: moderateScale(25),
  },
  title: {
    fontFamily: "Medium",
    fontSize: moderateScale(15),
  },
  subTitle: {
    fontFamily: "Regular",
    color: Colors.gray,
  },
  owner: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
});
