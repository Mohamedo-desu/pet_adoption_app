import { PETPROPS } from "@/types/pet";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import PetSubInfoCard from "./PetSubInfoCard";

const PetSubInfo = ({ pet }: { pet: PETPROPS }) => {
  return (
    <>
      <View style={styles.row}>
        <PetSubInfoCard
          icon={require("@/assets/images/calendar.png")}
          title={"Age"}
          value={pet.age + " Years"}
        />
        <PetSubInfoCard
          icon={require("@/assets/images/bone.png")}
          title={"Breed"}
          value={pet.breed}
        />
      </View>
      <View style={styles.row}>
        <PetSubInfoCard
          icon={require("@/assets/images/sex.png")}
          title={"Sex"}
          value={pet.sex}
        />
        <PetSubInfoCard
          icon={require("@/assets/images/weight.png")}
          title={"Weight"}
          value={pet.weight + " Kg"}
        />
      </View>
    </>
  );
};

export default PetSubInfo;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    gap: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
});
