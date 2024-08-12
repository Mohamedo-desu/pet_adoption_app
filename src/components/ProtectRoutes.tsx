import { Colors } from "@/constants/colors";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const ProtectRoutes = ({ children }: PropsWithChildren) => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const inAuthenticatedGroup = segments[0] === "(authenticated)";

  useEffect(() => {
    if (isSignedIn && !inAuthenticatedGroup) {
      router.replace("/(authenticated)");
    } else if (!isSignedIn) {
      router.replace("/(public)");
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectRoutes;
