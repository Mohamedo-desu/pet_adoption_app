import { useAuth } from "@clerk/clerk-expo";
import { Button, StyleSheet, View } from "react-native";
const Profile = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({});
