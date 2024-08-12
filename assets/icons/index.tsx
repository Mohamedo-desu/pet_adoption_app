import Fab from "@/components/Home/Fab";
import { moderateScale } from "react-native-size-matters";
import { BubbleChatIcon, FavouriteIcon, HomeIcon, UserIcon } from "./icons";

export const icons: {
  [key: string]: (props: { isFocused: boolean; color: string }) => JSX.Element;
} = {
  index: (props: { isFocused: boolean; color: string }): JSX.Element => {
    return (
      <HomeIcon
        strokeWidth={1.2}
        color={props.color}
        width={moderateScale(25)}
        height={moderateScale(25)}
      />
    );
  },
  favorite: (props: { isFocused: boolean; color: string }): JSX.Element => {
    return (
      <FavouriteIcon
        strokeWidth={1.2}
        color={props.color}
        width={moderateScale(25)}
        height={moderateScale(25)}
      />
    );
  },
  empty: (): JSX.Element => {
    return <Fab />;
  },

  inbox: (props: { isFocused: boolean; color: string }): JSX.Element => {
    return (
      <BubbleChatIcon
        strokeWidth={1.2}
        color={props.color}
        width={moderateScale(25)}
        height={moderateScale(25)}
      />
    );
  },
  profile: (props: { isFocused: boolean; color: string }): JSX.Element => {
    return (
      <UserIcon
        strokeWidth={1.2}
        color={props.color}
        width={moderateScale(25)}
        height={moderateScale(25)}
      />
    );
  },
};
