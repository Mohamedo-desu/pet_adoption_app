import { FavouriteIcon } from "@/assets/icons/icons";
import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const PetInfo = ({ pet }: { pet: PETPROPS }) => {
  return (
    <View>
      <Image source={{ uri: pet.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.address}>
            {pet.address || "Placeholder Address, City"}
          </Text>
        </View>
        <FavouriteIcon
          strokeWidth={2}
          color={Colors.primary}
          width={moderateScale(25)}
          height={moderateScale(25)}
        />
      </View>
    </View>
  );
};

export default PetInfo;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: moderateScale(350),
    objectFit: "cover",
  },
  infoContainer: {
    padding: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "Bold",
    fontSize: moderateScale(22),
  },
  address: {
    fontFamily: "Regular",
    fontSize: moderateScale(16),
    color: Colors.gray,
  },
});
