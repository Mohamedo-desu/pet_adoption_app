import PetInfo from "@/components/pet/PetInfo";
import PetSubInfo from "@/components/pet/PetSubInfo";
import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

const PetDetails = () => {
  const { item }: { item: string } = useLocalSearchParams();
  if (!item) return null;

  const pet: PETPROPS = JSON.parse(item);

  return (
    <View style={styles.container}>
      <PetInfo pet={pet} />
      <PetSubInfo pet={pet} />
    </View>
  );
};
export default PetDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
