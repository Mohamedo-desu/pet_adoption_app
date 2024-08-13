import { Colors } from "@/constants/colors";
import { PETPROPS } from "@/types/pet";
import { DEVICE_HEIGHT } from "@/utils/device";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const ABOUT_LENGTH = Math.floor(DEVICE_HEIGHT / 2.5);

const AboutPet = ({ pet }: { pet: PETPROPS }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <View style={{ padding: moderateScale(10) }}>
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: moderateScale(20),
        }}
      >
        About {pet.name}
      </Text>
      <Text
        style={{
          fontFamily: "Regular",
          fontSize: moderateScale(13),
        }}
      >
        {pet.about.length <= ABOUT_LENGTH
          ? pet.about
          : readMore
          ? pet.about
          : pet.about.slice(0, ABOUT_LENGTH) + "..."}
      </Text>

      {pet.about.length > ABOUT_LENGTH && (
        <Pressable
          onPress={() => setReadMore(!readMore)}
          style={{ marginTop: moderateScale(1) }}
        >
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: moderateScale(14),
              color: Colors.secondary,
            }}
          >
            {readMore ? "Read Less" : "Read More"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
export default AboutPet;
const styles = StyleSheet.create({});
