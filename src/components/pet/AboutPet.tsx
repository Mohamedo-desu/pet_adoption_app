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
    <View style={styles.container}>
      <Text style={styles.title}>About {pet.name}</Text>
      <Text style={styles.description}>
        {pet.about.length <= ABOUT_LENGTH
          ? pet.about
          : readMore
          ? pet.about
          : pet.about.slice(0, ABOUT_LENGTH) + "..."}
      </Text>

      {pet.about.length > ABOUT_LENGTH && (
        <Pressable
          onPress={() => setReadMore(!readMore)}
          style={styles.readMoreButton}
        >
          <Text style={styles.readMoreText}>
            {readMore ? "Read Less" : "Read More"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default AboutPet;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
  },
  title: {
    fontFamily: "Medium",
    fontSize: moderateScale(20),
  },
  description: {
    fontFamily: "Regular",
    fontSize: moderateScale(13),
  },
  readMoreButton: {
    marginTop: moderateScale(1),
  },
  readMoreText: {
    fontFamily: "Regular",
    fontSize: moderateScale(14),
    color: Colors.secondary,
  },
});
