import { Colors } from "@/constants/colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.page}>
      <ActivityIndicator size={"large"} color={Colors.primary} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
