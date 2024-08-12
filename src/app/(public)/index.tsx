import { Colors } from "@/constants/colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

WebBrowser.maybeCompleteAuthSession();

const index = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/", {
            scheme: "petsadop",
          }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
        <Pressable style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: moderateScale(450),
  },
  text: {
    fontFamily: "Bold",
    fontSize: moderateScale(25),
    textAlign: "center",
    letterSpacing: 0.3,
  },
  textWrapper: {
    flex: 1,
    padding: moderateScale(20),
    alignItems: "center",
    gap: moderateScale(20),
    justifyContent: "center",
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
