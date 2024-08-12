import TabBar from "@/components/Tab/TabBar";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
const _layout = () => {
  return (
    <Tabs
      tabBar={(props: any) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="favorite" />
      <Tabs.Screen name="inbox" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};
export default _layout;
const styles = StyleSheet.create({});
