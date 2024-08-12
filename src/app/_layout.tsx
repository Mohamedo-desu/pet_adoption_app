import ProtectRoutes from "@/components/ProtectRoutes";
import { Fonts } from "@/constants/fonts";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      return item;
    } catch (error) {
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

function InitialLoyout() {
  return (
    <ProtectRoutes>
      <Slot />
    </ProtectRoutes>
  );
}

function RootLayoutNav() {
  const [fontsLoaded, fontError] = useFonts(Fonts);
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <InitialLoyout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
