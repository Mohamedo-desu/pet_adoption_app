import { Colors } from "@/constants/colors";
import { SUBINFOCARDPROPS } from "@/types/pet";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const PetSubInfoCard = ({ icon, title, value }: SUBINFOCARDPROPS) => {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.value} numberOfLines={2}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default PetSubInfoCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light_gray,
    padding: moderateScale(5),
    borderRadius: 8,
    gap: moderateScale(10),
    flex: 1,
  },
  image: {
    width: moderateScale(30),
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Regular",
    fontSize: moderateScale(11),
    color: Colors.gray,
  },
  value: {
    fontFamily: "Medium",
    fontSize: moderateScale(13),
  },
});
