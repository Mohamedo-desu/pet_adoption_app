import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Category from "./Category";

interface Pet {
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex: string;
}

const PetListByCateg = () => {
  const [petLists, setPetLists] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  const getPetList = async (category: string) => {
    try {
      setLoading(true);
      const categoriesRef = collection(db, "pets");

      const q = await getDocs(
        query(categoriesRef, where("category", "==", category))
      );

      const pets = q.docs.map((doc) => doc.data()) as Pet[];

      setPetLists(pets);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetList(selectedCategory);
  }, [selectedCategory]);

  const renderItem = useCallback(({ item }: { item: Pet }) => {
    if (!item) return null;

    return (
      <View style={styles.pet}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.info}>
          <Text style={styles.breed}>{item.breed}</Text>
          <Text style={styles.age}>{item.age} YRS</Text>
        </View>
      </View>
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
        <Text style={{ fontFamily: "Medium", color: Colors.gray }}>
          No pets found
        </Text>
      </View>
    );
  }, []);
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
      />
    </View>
  );
};
export default PetListByCateg;
const styles = StyleSheet.create({
  flatList: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: moderateScale(10),
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
    width: moderateScale(150),
    height: moderateScale(135),
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
