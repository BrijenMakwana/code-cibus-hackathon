import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FoodDishConsumer = () => {
  return (
    <View style={styles.container}>
      {/* dish name */}
      <Text style={styles.dishName}>Burger</Text>
      {/* price */}
      <Text style={styles.price}>Rs. 70</Text>
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
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  dishName: {
    flex: 1,
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
  },
  deleteContainer: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
