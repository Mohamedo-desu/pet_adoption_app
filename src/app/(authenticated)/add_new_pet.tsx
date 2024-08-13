import FormInput from "@/components/new_pet/FormInput";
import PhotoModal from "@/components/new_pet/PhotoModal";
import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { submitPet } from "@/shared/Shared";
import { CATEGPROPS, PETPROPS } from "@/types/pet";
import { useUser } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

const AddNewPet = () => {
  const [pet, setPet] = useState<Partial<PETPROPS>>({
    category: "Dogs",
    sex: "Male",
  });
  const [categories, setCategories] = useState<CATEGPROPS[]>([]);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setPet((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (Object.keys(pet).length !== 9) {
        ToastAndroid.show("Please Provide all the details", ToastAndroid.SHORT);
        return;
      }
      setLoading(true);
      await submitPet(pet, user);
      setLoading(false);
      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const categoriesRef = collection(db, "pet_categories");
      const snapshot = await getDocs(categoriesRef);

      const categories = snapshot.docs.map((doc) => doc.data()) as CATEGPROPS[];
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          activeOpacity={0.8}
          onPress={() => setPhotoModalVisible(true)}
        >
          {pet.imageUrl?.trim() ? (
            <Image
              fadeDuration={500}
              source={{ uri: pet.imageUrl }}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <Entypo
              name="camera"
              size={moderateScale(50)}
              color={Colors.light_gray}
            />
          )}
        </TouchableOpacity>
        <FormInput
          label="Name"
          value={pet.name}
          onChangeText={(value) => handleInputChange("name", value)}
          autoComplete="name"
        />
        <FormInput
          label="Age"
          value={pet.age}
          onChangeText={(value) => handleInputChange("age", value)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Sex*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pet.sex}
            onValueChange={(value) => handleInputChange("sex", value)}
            style={styles.picker}
            itemStyle={styles.label}
            dropdownIconColor={Colors.primary}
          >
            <Picker.Item style={styles.pickerText} label="Male" value="Male" />
            <Picker.Item
              style={styles.pickerText}
              label="Female"
              value="Female"
            />
          </Picker>
        </View>
        <Text style={styles.label}>Category*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pet.category}
            onValueChange={(value) => handleInputChange("category", value)}
            style={styles.picker}
            itemStyle={styles.label}
            dropdownIconColor={Colors.primary}
          >
            {categories.map((category) => (
              <Picker.Item
                key={category.name}
                style={styles.pickerText}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View>
        <FormInput
          label="Breed"
          value={pet.breed}
          onChangeText={(value) => handleInputChange("breed", value)}
        />

        <FormInput
          label="Weight"
          value={pet.weight}
          onChangeText={(value) => handleInputChange("weight", value)}
          keyboardType="numeric"
        />

        <FormInput
          label="Address"
          value={pet.address}
          onChangeText={(value) => handleInputChange("address", value)}
          autoComplete="address-line1"
        />
        <FormInput
          label="About"
          value={pet.about}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
          style={{ paddingBottom: moderateScale(50) }}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.adoptMeBtn}
          disabled={loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={Colors.white} />
          ) : (
            <Text style={styles.adoptMeBtnText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
      <PhotoModal
        visible={photoModalVisible}
        setPhotoModalVisible={setPhotoModalVisible}
        handleInputChange={handleInputChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: moderateScale(10),
    backgroundColor: Colors.white,
  },
  bottomContainer: {
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    elevation: 1,
    zIndex: 1,
  },
  adoptMeBtn: {
    padding: moderateScale(10),
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  adoptMeBtnText: {
    fontFamily: "Medium",
    textAlign: "center",
    fontSize: moderateScale(18),
    color: Colors.white,
  },
  imageContainer: {
    borderStyle: "dashed",
    borderWidth: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: moderateScale(20),
    marginVertical: moderateScale(10),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: moderateScale(5),
    overflow: "hidden",
    marginBottom: moderateScale(15),
  },
  picker: {
    backgroundColor: Colors.light_gray,
  },
  label: {
    fontSize: moderateScale(15),
    marginBottom: moderateScale(10),
    fontFamily: "Regular",
    color: Colors.gray,
  },
  pickerText: {
    fontSize: moderateScale(15),
    fontFamily: "Medium",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AddNewPet;
