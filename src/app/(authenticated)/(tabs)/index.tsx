import Header from "@/components/Home/Header";
import PetListByCateg from "@/components/Home/PetListByCateg";
import Slider from "@/components/Home/Slider";
import { Colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
const index = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + moderateScale(10),
        },
      ]}
    >
      <Header />
      <Slider />
      <PetListByCateg />
    </View>
  );
};
export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: moderateScale(15),
  },
});
