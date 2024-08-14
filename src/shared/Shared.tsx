import { db, storage } from "@/config/firebaseconfig";
import { PETPROPS } from "@/types/pet";
import { UserResource } from "@clerk/types";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
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
    const docRef = await addDoc(collection(db, "pets"), {});

    const id = docRef.id;
    let uri = "";

    if (pet.imageUrl) {
      uri = await uploadImage(pet.imageUrl, `pets/${user?.id}/`, id);
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
    console.error("Error submitting pet:", error);
    throw error;
  }
};

export const uploadImage = async (
  image: string,
  path: string,
  postId: string
) => {
  try {
    const response = await fetch(image);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${image}`);
    }

    const blob = await response.blob();

    const storageRef = ref(storage, `${path}/${postId}`);
    await uploadBytesResumable(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export const getUserPosts = async (id: string | undefined) => {
  try {
    const docref = collection(db, "pets");

    const q = query(
      docref,
      where("user.userId", "==", id)
      //orderBy("createdAt", "desc")
    );
    const snapShot = await getDocs(q);

    const posts = snapShot.docs.map((doc) => doc.data()) as PETPROPS[];

    return posts;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserPosts = async (postId: string | undefined) => {
  try {
    const docref = doc(collection(db, "pets"), postId);

    await deleteDoc(docref);
  } catch (error) {
    console.log(error);
  }
};
