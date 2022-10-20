import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const OnBoard = (props) => {
  const { imageName, title, subtitle } = props;
  return (
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}>{title}</Text>
      {/* image */}
      <Image source={imageName} style={styles.image} />
      {/* subtitle */}
      <Text style={styles.subTitle}>{subtitle}</Text>
    </View>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "500",
    color: colors.primary,
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 20,
    resizeMode: "contain",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.secondary,
    marginTop: 20,
    textAlign: "center",
  },
});
