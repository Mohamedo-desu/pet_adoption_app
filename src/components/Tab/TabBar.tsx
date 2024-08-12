import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import TabBarButton from "./TabBarButton";

const TabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: {
    routes: {
      key: string;
      name: string;
      params?: object;
    }[];
    index: number;
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarLabel?: string;
        title?: string;
      };
    };
  };
  navigation: {
    emit: (event: {
      type: string;
      target: string;
      canPreventDefault?: boolean;
    }) => {
      defaultPrevented: boolean;
    };
    navigate: (routeName: string, params?: object) => void;
  };
}): JSX.Element => {
  const insets = useSafeAreaInsets();
  const { routes, index } = state;
  const { emit, navigate } = navigation;
  const isFocused = (routeName: string) => routes[index].name === routeName;

  const handlePress = (routeName: string) => {
    const event = emit({
      type: "tabPress",
      target: routeName,
      canPreventDefault: true,
    });

    if (!isFocused(routeName) && !event.defaultPrevented) {
      navigate(routeName, routes[index].params);
    }
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          marginBottom: insets.bottom,
          backgroundColor: Colors.white,
        },
      ]}
    >
      {routes.map((route) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isCurrent = isFocused(route.name);
        const color = isCurrent ? Colors.primary : Colors.gray;

        return (
          <TabBarButton
            key={route.name}
            onPress={() => handlePress(route.name)}
            onLongPress={() =>
              emit({ type: "tabLongPress", target: route.key })
            }
            isFocused={isCurrent}
            routeName={route.name}
            color={color}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: moderateScale(50),
    elevation: 1,
  },
});

export default TabBar;
