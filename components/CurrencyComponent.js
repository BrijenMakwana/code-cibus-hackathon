import { Pressable, StyleSheet, Text, Alert } from "react-native";
import React from "react";
import colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CurrencyComponent = (props) => {
  const { code, name, symbol, setCurrency, setShowCurrencyModal, totalDishes } =
    props;

  // change currency
  const changeCurrency = () => {
    if (totalDishes > 0) {
      Alert.alert(
        "Warning⚠️",
        "The menu is not empty. Please delete every dish to change the currency."
      );
    } else {
      setCurrency(symbol);
      storeCurrency(symbol);
      setShowCurrencyModal(false);
    }
  };

  // store currency in local storage
  const storeCurrency = async (symbol) => {
    try {
      await AsyncStorage.setItem("local_currency", symbol);
    } catch (e) {}
  };

  return (
    <Pressable style={styles.container} onPress={changeCurrency}>
      {/* code */}
      <Text style={styles.code}>{code}</Text>

      {/* name */}
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

export default CurrencyComponent;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: colors.background,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  code: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "600",
    paddingLeft: 20,
    textTransform: "uppercase",
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
