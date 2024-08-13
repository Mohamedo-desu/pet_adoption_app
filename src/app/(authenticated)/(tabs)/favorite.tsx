import PetCard from "@/components/pet/PetCard";
import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { getFavList } from "@/shared/Shared";
import { PETPROPS } from "@/types/pet";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
const Favorite = () => {
  const { user } = useUser();
  const [favPets, setFavPets] = useState<PETPROPS[]>([]);
  const [loading, setLoading] = useState(false);

  const getFavPets = async () => {
    try {
      setLoading(true);

      const result = await getFavList(user?.id);
      if (!result || !result.favList || result.favList.length <= 0) {
        setFavPets([]);
        setLoading(false);
        return;
      }

      const docref = collection(db, "pets");
      const q = query(docref, where("id", "in", result.favList));
      const snapShot = await getDocs(q);

      const pets = snapShot.docs.map((doc) => doc.data()) as PETPROPS[];

      setFavPets(pets);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderItem = useCallback(({ item }: { item: PETPROPS }) => {
    if (!item) return null;

    return <PetCard item={item} />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loading && favPets.length === 0 && (
          <Text style={{ fontFamily: "Regular", color: Colors.gray }}>
            You have no favorite pets
          </Text>
        )}
      </View>
    );
  }, [loading, favPets]);

  useEffect(() => {
    user?.id && getFavPets();
  }, [user]);

  return (
    <FlatList
      refreshing={loading}
      onRefresh={() => getFavPets()}
      data={favPets}
      numColumns={2}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      style={styles.container}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.contentContainerStyle}
      columnWrapperStyle={{ gap: moderateScale(5) }}
    />
  );
};
export default Favorite;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: moderateScale(10),
  },

  contentContainerStyle: {
    gap: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
});
