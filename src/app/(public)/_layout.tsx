import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
const PublicLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(authenticated)/"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};
export default PublicLayout;
