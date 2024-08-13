import { useAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";

const ProtectRoutes = ({ children }: PropsWithChildren) => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const inAuthenticatedGroup = segments[0] === "(authenticated)";

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && !inAuthenticatedGroup) {
        router.replace("/(authenticated)");
      } else if (!isSignedIn) {
        router.replace("/(public)");
      }
    }
  }, [isLoaded, isSignedIn, inAuthenticatedGroup]);

  return <>{children}</>;
};

export default ProtectRoutes;
