import AboutPet from "@/components/pet/AboutPet";
import OwnerInfo from "@/components/pet/OwnerInfo";
import PetInfo from "@/components/pet/PetInfo";
import PetSubInfo from "@/components/pet/PetSubInfo";
import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { useLocalSearchParams } from "expo-router";
import {
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

  const pet: PETPROPS = JSON.parse(item);

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
        <TouchableOpacity style={styles.adoptMeBtn}>
          <Text style={styles.adoptMeBtnText}>Adopt Me</Text>
        </TouchableOpacity>
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
