import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const FoodDishVendor = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dishContainer}>
        {/* dish name */}
        <Text style={styles.dishName}>Burger</Text>
        {/* price */}
        <Text style={styles.price}>Rs. 70</Text>
      </View>

      {/* delete button */}
      <Pressable style={styles.deleteContainer}>
        <MaterialIcons name="delete" size={27} color="red" />
      </Pressable>
    </View>
  );
};

export default FoodDishVendor;

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
  },
  dishContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginRight: 20,
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
