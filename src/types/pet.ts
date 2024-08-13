import { ImageSourcePropType } from "react-native";

export interface PETPROPS {
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex: string;
  weight: string;
  address: string;
}

export interface SUBINFOCARDPROPS {
  icon: ImageSourcePropType;
  title: string;
  value: string;
}
