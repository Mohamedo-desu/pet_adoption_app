// Slider.tsx
import { db } from "@/config/firebaseconfig";
import { Colors } from "@/constants/colors";
import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import ExpandingDots from "./ExpandingDots";

interface SliderItem {
  name: string;
  imageUrl: string;
}

const Slider: React.FC = () => {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const currentIndex = useSharedValue<number>(0);
  const scrollX = useSharedValue<number>(0);
  const flatListRef = useRef<Animated.FlatList<SliderItem>>(null);

  const getSliders = async () => {
    try {
      const sliderRef = collection(db, "sliders");
      const snapshot = await getDocs(sliderRef);
      const slidersData = snapshot.docs.map((doc) => doc.data() as SliderItem);
      setSliders(slidersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSliders();
  }, []);

  const renderItem = useCallback(({ item }: { item: SliderItem }) => {
    if (!item) return null;
    return (
      <View style={styles.imageCon}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
    );
  }, []);

  const autoScroll = () => {
    "worklet";
    if (sliders.length > 0 && !isInteracting) {
      const nextIndex =
        currentIndex.value === sliders.length - 1 ? 0 : currentIndex.value + 1;
      currentIndex.value = nextIndex;
      scrollX.value = nextIndex * Dimensions.get("window").width;
      runOnJS(() => {
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      })();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      runOnJS(autoScroll)();
    }, 10000);

    return () => clearInterval(interval);
  }, [sliders.length, isInteracting]);

  const interactionHandler = (state: boolean) => () => {
    setIsInteracting(state);
  };

  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.name}
        data={sliders}
        renderItem={renderItem}
        style={styles.container}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: Dimensions.get("window").width,
          offset: Dimensions.get("window").width * index,
          index,
        })}
        onScroll={useAnimatedScrollHandler({
          onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
          },
        })}
        scrollEventThrottle={16}
        onTouchStart={interactionHandler(true)}
        onTouchEnd={interactionHandler(false)}
        onScrollBeginDrag={interactionHandler(true)}
        onScrollEndDrag={interactionHandler(false)}
      />
      <ExpandingDots
        data={sliders}
        scrollX={scrollX}
        activeDotColor={Colors.primary}
        inActiveDotColor={Colors.gray}
      />
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  imageCon: {
    width: Dimensions.get("window").width,
    height: moderateScale(170),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
});
