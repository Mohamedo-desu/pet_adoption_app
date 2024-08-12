import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
const Category = () => {
  const [categories, setCategories] = useState<
    {
      name: string;
      imageUrl: string;
    }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const getCategories = async () => {
    try {
      const categoriesRef = collection(db, "pet_categories");
      const snapshot = await getDocs(categoriesRef);

      const categories = snapshot.docs.map((doc) => doc.data()) as {
        name: string;
        imageUrl: string;
      }[];
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: { imageUrl: string; name: string } }) => {
      if (!item) return null;

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flex: 1, gap: moderateScale(5) }}
          onPress={() => setSelectedCategory(item.name)}
        >
          <View
            style={[
              styles.imageCon,
              selectedCategory === item.name && styles.selectedCateg,
            ]}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      );
    },
    [selectedCategory]
  );

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{}}>
      <Text style={styles.text}>Category</Text>
      <FlatList
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.name}
        data={categories}
        renderItem={renderItem}
        style={styles.container}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </View>
  );
};
export default Category;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(10),
  },
  text: {
    fontFamily: "Medium",
    fontSize: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  image: {
    width: moderateScale(40),
    aspectRatio: 1,
    resizeMode: "contain",
  },
  imageCon: {
    backgroundColor: Colors.light_primary,
    padding: moderateScale(15),
    alignItems: "center",
    borderWidth: 1,
    borderRadius: moderateScale(15),
    borderColor: Colors.primary,
  },
  columnWrapperStyle: { gap: moderateScale(10) },
  itemText: {
    fontFamily: "Regular",
    textAlign: "center",
  },
  selectedCateg: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
});
