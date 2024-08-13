import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

import { PETPROPS } from "@/types/pet";
import debounce from "@/utils/functions";
import Category from "./Category";

const PetListByCateg = () => {
  const [petLists, setPetLists] = useState<PETPROPS[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  const getPetList = async (category: string) => {
    try {
      setLoading(true);
      const categoriesRef = collection(db, "pets");

      const q = await getDocs(
        query(categoriesRef, where("category", "==", category))
      );

      const pets = q.docs.map((doc) => doc.data()) as PETPROPS[];

      setPetLists(pets);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const debouncedGetPetList = useMemo(() => debounce(getPetList, 500), []);

  useEffect(() => {
    debouncedGetPetList(selectedCategory);
  }, [debouncedGetPetList, selectedCategory]);

  const router = useRouter();

  const renderItem = useCallback(({ item }: { item: PETPROPS }) => {
    if (!item) return null;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/pet_details",
            params: { item: JSON.stringify(item) },
          })
        }
        style={styles.pet}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.info}>
          <Text style={styles.breed}>{item.breed}</Text>
          <Text style={styles.age}>{item.age} YRS</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: moderateScale(20),
          width: Dimensions.get("window").width,
        }}
      >
        {!loading && (
          <Text style={{ fontFamily: "Medium", color: Colors.gray }}>
            No pets found
          </Text>
        )}
      </View>
    );
  }, [loading]);

  return (
    <View style={styles.container}>
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList
        refreshing={loading}
        onRefresh={() => getPetList(selectedCategory)}
        ListEmptyComponent={ListEmptyComponent}
        horizontal
        keyExtractor={(item) => item.name}
        data={petLists}
        renderItem={renderItem}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default PetListByCateg;

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 0,
  },
  contentContainerStyle: {
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  container: {
    gap: moderateScale(12),
  },
  name: {
    fontFamily: "Medium",
    fontSize: moderateScale(17),
  },
  breed: {
    fontFamily: "Regular",
    color: Colors.gray,
  },
  age: {
    fontFamily: "Regular",
    color: Colors.primary,
    backgroundColor: Colors.light_primary,
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(2),
    fontSize: moderateScale(10),
  },
  image: {
    width: moderateScale(140),
    height: moderateScale(125),
    resizeMode: "cover",
    borderRadius: moderateScale(10),
  },
  pet: {
    padding: moderateScale(10),
    backgroundColor: Colors.light_gray,
    borderRadius: moderateScale(10),
    gap: moderateScale(2),
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
