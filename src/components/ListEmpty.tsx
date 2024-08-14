import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
const ListEmpty = ({ loading, data, text }) => {
  return (
    <View style={styles.ListEmptyComponent}>
      {!loading && data.length === 0 && (
        <Text style={styles.ListEmptyComponentText}>{text}</Text>
      )}
    </View>
  );
};
export default ListEmpty;
const styles = StyleSheet.create({
  ListEmptyComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ListEmptyComponentText: {
    fontFamily: "Regular",
    color: Colors.gray,
  },
});
