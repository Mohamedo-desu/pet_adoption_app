import { Colors } from "@/constants/colors";
import { CHATCARDPROPS } from "@/types/pet";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function ChatCard({ item }: { item: CHATCARDPROPS }) {
  return (
    <Link href={`/chat_screen?chatId=${item.chatId}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.8}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
const styles = StyleSheet.create({
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  container: {
    backgroundColor: Colors.light_gray,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(15),
  },
  name: {
    fontFamily: "Medium",
    fontSize: moderateScale(18),
    flex: 1,
  },
});
