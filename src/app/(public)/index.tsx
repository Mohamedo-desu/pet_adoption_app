import { Colors } from "@/constants/colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  useWarmUpBrowser();

  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleOAuthSignIn = useCallback(async () => {
    if (!signIn || !signUp) return;
    try {
      const transferAccount =
        signUp?.verifications?.externalAccount?.status === "transferable" &&
        signUp?.verifications?.externalAccount?.error?.code ===
          "external_account_exists";

      if (transferAccount) {
        const signInResponse = await signIn.create({
          transfer: true,
          redirectUrl: Linking.createURL("/", { scheme: "petsadop" }),
        });

        if (signInResponse.status === "complete") {
          await setSignInActive({ session: signInResponse.createdSessionId });
          return;
        }
      }

      const createNewUser =
        signIn?.firstFactorVerification?.status === "transferable";

      if (createNewUser) {
        const signUpResponse = await signUp.create({
          transfer: true,
          redirectUrl: Linking.createURL("/", { scheme: "petsadop" }),
        });

        if (signUpResponse.status === "complete") {
          await setSignUpActive({ session: signUpResponse.createdSessionId });
          return;
        }
      }

      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/", { scheme: "petsadop" }),
      });

      if (createdSessionId) {
        await setSignInActive({ session: createdSessionId });
      } else {
        console.log("Additional steps required after OAuth");
      }
    } catch (error) {
      console.error("OAuth error", error);
    }
  }, [signIn, signUp, startOAuthFlow, setSignInActive, setSignUpActive]);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.image}
        resizeMode="cover"
        fadeDuration={500}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Ready to make a new Friend</Text>
        <Text style={styles.subText}>
          Quickly find and adopt the pet that suits you, and make their life
          happier once again.
        </Text>
        <View style={styles.spacer} />
        <Pressable style={styles.btn} onPress={handleOAuthSignIn}>
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: moderateScale(450),
  },
  textWrapper: {
    flex: 1,
    padding: moderateScale(20),
    alignItems: "center",
    gap: moderateScale(20),
    justifyContent: "center",
  },
  text: {
    fontFamily: "Bold",
    fontSize: moderateScale(25),
    textAlign: "center",
    letterSpacing: 0.3,
  },
  subText: {
    fontFamily: "Regular",
    fontSize: moderateScale(18),
    textAlign: "center",
    color: Colors.gray,
  },
  btn: {
    padding: moderateScale(14),
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Medium",
    fontSize: moderateScale(20),
    textAlign: "center",
    color: Colors.white,
  },
  spacer: {
    flex: 1,
  },
});
