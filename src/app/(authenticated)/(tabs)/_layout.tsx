import TabBar from "@/components/Tab/TabBar";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
const _layout = () => {
  return (
    <Tabs tabBar={(props: any) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="favorite" options={{ title: "Favorite Pets" }} />
      <Tabs.Screen
        name="empty"
        listeners={() => ({
          tabPress: (e) => e.preventDefault(),
        })}
      />
      <Tabs.Screen name="inbox" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};
export default _layout;
const styles = StyleSheet.create({});
