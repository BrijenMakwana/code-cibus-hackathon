import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* app name */}
      <Text style={styles.heading}>Cibus</Text>

      {/* button container */}
      <View style={styles.btnContainer}>
        {/* vendor */}
        <Pressable>
          <Image
            source={require("../assets/images/food-stall.png")}
            style={styles.icon}
          />
        </Pressable>
        {/* consumer */}
        <Pressable>
          <Image
            source={require("../assets/images/consumer.png")}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 100,
  },
  icon: {
    height: 100,
    width: 100,
  },
});
