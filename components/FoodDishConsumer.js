import { StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../constants/colors";
import colors from "../constants/colors";

const FoodDishConsumer = (props) => {
  const { dishName, price } = props;
  return (
    <View style={styles.container}>
      {/* dish name */}
      <Text style={styles.dishName}>{dishName}</Text>

      {/* price */}
      <Text style={styles.price}>Rs. {price}</Text>
    </View>
  );
};

export default FoodDishConsumer;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 3,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
  },
  dishName: {
    flex: 1,
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    width: 80,
    color: colors.primary,
  },
  deleteContainer: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
