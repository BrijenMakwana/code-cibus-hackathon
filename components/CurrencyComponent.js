import { Pressable, StyleSheet, Text, Alert } from "react-native";
import React from "react";
import colors from "../constants/colors";

const CurrencyComponent = (props) => {
  const { code, name, symbol, setCurrency, setShowCurrencyModal, totalDishes } =
    props;

  const changeCurrency = () => {
    if (totalDishes > 0) {
      Alert.alert(
        "Attension",
        "Menu is not empty, please delete every dishes to change the currency"
      );
    } else {
      setCurrency(symbol);
      setShowCurrencyModal(false);
    }
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
