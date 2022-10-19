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
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";

const HomeScreen = () => {
  const navigation = useNavigation();
  // go to vendor sign in screen
  const goToVendorSignIn = () => {
    getUser();
  };

  // go to QR scan screen
  const goToQRScan = () => {
    navigation.navigate("QRScan");
  };

  // get user from local storage

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("logged_in_user");
      if (user !== null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "VendorDashboard" }],
        });
      } else {
        navigation.navigate("VendorSignIn");
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* app name */}
      <Image
        source={require("../assets/images/foodora.png")}
        style={styles.logo}
      />

      {/* i'm a  */}
      <Text style={styles.chooseRole}>I'm a</Text>

      {/* button container */}
      <View style={styles.btnContainer}>
        {/* vendor */}
        <Pressable onPress={goToVendorSignIn} style={styles.imageContainer}>
          <Image
            source={require("../assets/images/vendor.png")}
            style={styles.icon}
          />
          <Text style={styles.roleText}>Vendor</Text>
        </Pressable>
        {/* consumer */}
        <Pressable onPress={goToQRScan} style={styles.imageContainer}>
          <Image
            source={require("../assets/images/eat.png")}
            style={styles.icon}
          />
          <Text style={styles.roleText}>Foodie</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 150,
    width: 320,
  },
  chooseRole: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.secondary,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  roleText: {
    fontSize: 20,
    fontWeight: "500",
    textTransform: "capitalize",
    marginTop: 10,
    color: colors.secondary,
    fontWeight: "600",
  },
  icon: {
    height: 120,
    width: 120,
  },
});
