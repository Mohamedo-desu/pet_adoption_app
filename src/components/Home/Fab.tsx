import { Colors } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
const Fab = () => {
  return (
    <Link href={"/add_new_pet"} asChild>
      <TouchableOpacity activeOpacity={0.8} style={styles.fab}>
        <MaterialIcons
          name="pets"
          color={Colors.white}
          size={moderateScale(25)}
        />
      </TouchableOpacity>
    </Link>
  );
};
export default Fab;
const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.primary,
    width: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: moderateScale(30),
    marginBottom: moderateScale(20),
  },
});
