import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface PROPS {
  loading: boolean;
  data: any[];
  text: string;
}
const ListEmpty = ({ loading, data, text }: PROPS) => {
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
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ListEmptyComponentText: {
    fontFamily: "Regular",
    color: Colors.gray,
    fontSize: moderateScale(15),
    textAlign: "center",
  },
});
