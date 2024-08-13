import MarkFav from "@/components/MarkFav";
import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

const PetCard = ({ item }: { item: PETPROPS }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/pet_details",
          params: { item: JSON.stringify(item) },
        })
      }
      style={styles.pet}
    >
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.image}>
        <View style={styles.fav}>
          <MarkFav pet={item} color={Colors.gray} size={moderateScale(20)} />
        </View>
      </ImageBackground>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <View style={styles.info}>
        <Text style={styles.breed} numberOfLines={1}>
          {item.breed}
        </Text>
        <Text style={styles.age}>{item.age} YRS</Text>
      </View>
    </TouchableOpacity>
  );
};
export default PetCard;
const styles = StyleSheet.create({
  name: {
    fontFamily: "Medium",
    fontSize: moderateScale(16),
  },
  breed: {
    fontFamily: "Regular",
    color: Colors.gray,
    flex: 1,
  },
  age: {
    fontFamily: "Regular",
    color: Colors.primary,
    backgroundColor: Colors.light_primary,
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(2),
    fontSize: moderateScale(10),
  },
  image: {
    width: "100%",
    height: moderateScale(125),
    resizeMode: "cover",
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  pet: {
    padding: moderateScale(10),
    backgroundColor: Colors.light_gray,
    borderRadius: moderateScale(10),
    gap: moderateScale(2),
    width: moderateScale(160),
    height: moderateScale(190),
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fav: {
    position: "absolute",
    zIndex: 10,
    right: 5,
    top: 5,
  },
});
