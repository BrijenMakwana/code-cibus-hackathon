import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
} from "react-native";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import OnBoard from "../components/OnBoard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const boardingArray = [
    {
      id: "1",
      title: "Create Food Menu",
      image: require("../assets/images/create_menu.png"),
      subtitle:
        "Vendors can create food menu by adding dishes names and their prices",
    },
    {
      id: "2",
      title: "Generate QR Code",
      image: require("../assets/images/generate_qr.png"),
      subtitle:
        "App will generate a unique QR code for vendors which can be downloaded",
    },
    {
      id: "3",
      title: "Scan the QR code to get menu",
      image: require("../assets/images/scan_app.png"),
      subtitle:
        "Foodies can scan the QR code using this app and menu will be displayed in the app",
    },
  ];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    getFirstTime();
  }, []);

  const ref = useRef();

  // store  in local storage
  const storeIsFirstTime = async () => {
    try {
      await AsyncStorage.setItem("first_time", "yes");
    } catch (e) {
      // saving error
    }
  };

  // check if first time from local storage
  const getFirstTime = async () => {
    try {
      const first = await AsyncStorage.getItem("first_time");
      if (first) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  const next = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != boardingArray.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const skip = () => {
    const lastSlideIndex = boardingArray.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const getStarted = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    storeIsFirstTime();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={boardingArray}
          pagingEnabled
          renderItem={({ item }) => (
            <OnBoard
              imageName={item.image}
              title={item.title}
              subtitle={item.subtitle}
            />
          )}
        />
      </View>

      {/*  indicator */}
      <View style={styles.indicatorContainer}>
        {boardingArray.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: colors.primary,
                width: 30,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.btnContainer}>
        {currentSlideIndex == boardingArray.length - 1 ? (
          <CustomButton buttonText="get started" onPressFunction={getStarted} />
        ) : (
          <>
            <CustomButton buttonText="skip" onPressFunction={skip} />
            <CustomButton buttonText="next" onPressFunction={next} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    backgroundColor: colors.background,
    marginTop: "auto",
    marginBottom: "auto",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    height: 2.5,
    width: 30,
    backgroundColor: colors.secondary,
    marginHorizontal: 3,
    borderRadius: 3,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
  },
});
export default OnboardingScreen;
