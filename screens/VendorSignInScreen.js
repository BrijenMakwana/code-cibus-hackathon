import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const VendorSignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* app name */}
      <Text style={styles.heading}>Cibus</Text>

      {/* instruction */}
      <Text style={styles.instruction}>
        "Please sign in to create the food menu"
      </Text>

      {/* sign in with google button */}
      <Text style={styles.signInText}>sign in with google</Text>
      <Image
        source={require("../assets/images/google.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

export default VendorSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 50,
    textAlign: "center",
    textTransform: "capitalize",
  },
  instruction: {
    fontSize: 20,
    marginTop: 20,
  },
  signInText: {
    fontSize: 20,
    color: "green",
    marginTop: 40,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
});
