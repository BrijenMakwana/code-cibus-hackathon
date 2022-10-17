import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  // go to vendor sign in screen
  const goToVendorSignIn = () => {
    navigation.navigate("VendorSignIn");
  };

  // go to QR scan screen
  const goToQRScan = () => {
    navigation.navigate("QRScan");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* app name */}
      <Text style={styles.heading}>Cibus</Text>

      {/* button container */}
      <View style={styles.btnContainer}>
        {/* vendor */}
        <Pressable onPress={goToVendorSignIn}>
          <Image
            source={require("../assets/images/food-stall.png")}
            style={styles.icon}
          />
        </Pressable>
        {/* consumer */}
        <Pressable onPress={goToQRScan}>
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
