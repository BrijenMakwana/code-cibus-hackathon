import { StyleSheet, TextInput } from "react-native";
import React from "react";
import colors from "../constants/colors";

const CustomInput = (props) => {
  const {
    placeholderText,
    inputValue,
    onChangeFunction,
    isSecure = false,
    onSubmitFunction = undefined,
    isNumericKeyboard = false,
  } = props;
  return (
    <TextInput
      placeholder={placeholderText}
      style={styles.input}
      value={inputValue}
      onChangeText={(text) => onChangeFunction(text)}
      onSubmitEditing={onSubmitFunction}
      secureTextEntry={isSecure}
      keyboardType={isNumericKeyboard ? "decimal-pad" : "default"}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    backgroundColor: colors.background,
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
