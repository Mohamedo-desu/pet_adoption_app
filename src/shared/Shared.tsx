import { db } from "@/config/firebaseconfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const getFavList = async (id: string | undefined) => {
  try {
    const docref = collection(db, "fav_pets");
    const snapShot = await getDoc(doc(docref, id));

    if (snapShot.exists()) {
      return snapShot.data();
    } else {
      await setDoc(doc(docref, id), { id: id, favList: [] });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateFavList = async (
  id: string | undefined,
  petId: string,
  action: string
) => {
  try {
    const docref = collection(db, "fav_pets");
    await updateDoc(doc(docref, id), {
      favList: action === "add" ? arrayUnion(petId) : arrayRemove(petId),
    });
  } catch (error) {
    console.log(error);
  }
};
