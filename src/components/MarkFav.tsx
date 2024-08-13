import { Colors } from "@/constants/colors";
import { getFavList, updateFavList } from "@/shared/Shared";
import { PETPROPS } from "@/types/pet";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { moderateScale } from "react-native-size-matters";
const MarkFav = ({
  pet,
  color = Colors.gray,
  size = moderateScale(30),
}: {
  pet: PETPROPS;
  color?: string;
  size?: number;
}) => {
  const { user } = useUser();
  const [favList, setFavList] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getFav = async () => {
    try {
      const result = await getFavList(user?.id);
      if (result) {
        setFavList(result.favList);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const updateFav = async (action: string) => {
    try {
      setLoading(true);
      await updateFavList(user?.id, pet.id, action);
      getFav();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    user?.id && getFav();
  }, [user]);

  return (
    <>
      {loading ? (
        <ActivityIndicator size={"small"} color={Colors.primary} />
      ) : favList?.includes(pet.id) ? (
        <Pressable onPress={() => updateFav("remove")}>
          <AntDesign name="heart" color={Colors.red} size={size} />
        </Pressable>
      ) : (
        <Pressable onPress={() => updateFav("add")}>
          <AntDesign name="hearto" color={color} size={size} />
        </Pressable>
      )}
    </>
  );
};
export default MarkFav;
