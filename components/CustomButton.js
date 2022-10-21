import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import colors from "../constants/colors";

const CustomButton = (props) => {
  const { buttonText, onPressFunction } = props;
  return (
    <Pressable
      onPress={onPressFunction}
      style={styles.btnContainer}
      android_ripple={{ color: colors.primary }}
    >
      <Text style={styles.btnText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.secondary,
    minWidth: 150,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 10,
  },
  btnText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
