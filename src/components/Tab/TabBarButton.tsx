import { icons } from "@/assets/icons/";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const TabBarButton = (props: {
  isFocused: boolean | ((name: string) => boolean);
  routeName: string;
  color: string;
  onPress: () => void;
  onLongPress: () => void;
}): JSX.Element => {
  const { isFocused, routeName, color } = props;

  return (
    <Pressable {...props} style={styles.container}>
      <View style={styles.containerBtn}>
        {icons[routeName]({
          color,
          isFocused:
            typeof isFocused === "boolean" ? isFocused : isFocused(routeName),
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  containerBtn: { alignItems: "center", justifyContent: "center" },
});

export default TabBarButton;
