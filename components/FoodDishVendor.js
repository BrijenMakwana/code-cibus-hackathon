import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { db, doc, deleteDoc } from "../firebase/index";

const FoodDishVendor = (props) => {
  const { id, dishName, price, getMenu } = props;

  // delete food dish
  const deleteFoodDish = async () => {
    await deleteDoc(doc(db, "brijenma@gmail.com", id));
    getMenu();
  };
  return (
    <View style={styles.container}>
      <View style={styles.dishContainer}>
        {/* dish name */}
        <Text style={styles.dishName}>{dishName}</Text>
        {/* price */}
        <Text style={styles.price}>Rs. {price}</Text>
      </View>

      {/* delete button */}
      <Pressable style={styles.deleteContainer} onPress={deleteFoodDish}>
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
    borderBottomColor: "gray",
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
    textTransform: "capitalize",
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
