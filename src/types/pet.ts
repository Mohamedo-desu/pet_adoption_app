import { ImageSourcePropType } from "react-native";

export interface PETPROPS {
  id: string;
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex: string;
  weight: string;
  address: string;
  about: string;
  user: {
    userImage: string;
    userName: string;
    userId: string;
  };
}

export interface SUBINFOCARDPROPS {
  icon: ImageSourcePropType;
  title: string;
  value: string;
}

export type CATEGPROPS = {
  name: string;
  imageUrl: string;
};

export interface CHATCARDPROPS {
  chatId: string;
  imageUrl: string;
  name: string;
}
