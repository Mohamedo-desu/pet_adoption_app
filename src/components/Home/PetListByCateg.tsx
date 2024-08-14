import { db } from "@/config/firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

import { PETPROPS } from "@/types/pet";

import { debounce } from "@/utils/functions";
import ListEmpty from "../ListEmpty";
import PetCard from "../pet/PetCard";
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

  const renderItem = useCallback(({ item }: { item: PETPROPS }) => {
    if (!item) return null;

    return <PetCard item={item} />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <ListEmpty data={petLists} loading={loading} text={"No pets found"} />
    );
  }, [loading, petLists]);

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
});
