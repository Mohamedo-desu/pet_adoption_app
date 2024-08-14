import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import MarkFav from "../MarkFav";

const PetInfo = ({ pet }: { pet: PETPROPS }) => {
  return (
    <>
      <Image
        source={{ uri: pet.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.petTexts}>
          <Text style={styles.name} numberOfLines={2}>
            {pet.name}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {pet.address}
          </Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </>
  );
};

export default PetInfo;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: moderateScale(350),
  },
  infoContainer: {
    padding: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: moderateScale(35),
  },
  petTexts: { flex: 1 },
  name: {
    fontFamily: "Bold",
    fontSize: moderateScale(18),
  },
  address: {
    fontFamily: "Regular",
    fontSize: moderateScale(14),
    color: Colors.gray,
  },
});
