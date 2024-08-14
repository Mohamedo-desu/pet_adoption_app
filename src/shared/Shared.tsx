import { db, storage } from "@/config/firebaseconfig";
import { PETPROPS } from "@/types/pet";
import { UserResource } from "@clerk/types";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const getFavList = async (id: string | undefined) => {
  try {
    const docref = collection(db, "fav_pets");
    const snapShot = await getDoc(doc(docref, id));

    if (snapShot.exists()) {
      return snapShot.data() as { id: string | undefined; favList: string[] };
    }
    await setDoc(doc(docref, id), { id, favList: [] });

    return { id, favList: [] };
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
export const submitPet = async (pet: Partial<PETPROPS>, user: UserResource) => {
  try {
    const docref = await addDoc(collection(db, "pets"), {});

    const id = docref.id;

    let uri: string = "";

    if (pet.imageUrl) {
      uri = await uploadImage(pet.imageUrl, `pets/${user?.id}/`);
    }

    await setDoc(doc(db, "pets", id), {
      ...pet,
      id,
      imageUrl: uri,
      about: pet.about?.slice(0, 1000),
      user: {
        userImage: user?.imageUrl,
        userName: user?.fullName,
        userId: user?.id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (image: string, path: string) => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const fileName = image.split("/").pop();

    const storageRef = ref(storage, `${path}/${fileName}`);
    await uploadBytesResumable(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
