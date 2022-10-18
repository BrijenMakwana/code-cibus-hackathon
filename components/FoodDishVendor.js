import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { db, doc, deleteDoc, updateDoc } from "../firebase/index";

const FoodDishVendor = (props) => {
  const {
    id,
    dishName,
    price,
    getMenu,
    // setAddShowModal,
    // editDishName,
    // setDishName,
    // editPrice,
    // setPrice,
  } = props;

  // delete food dish
  const deleteFoodDish = async () => {
    await deleteDoc(doc(db, "brijenma@gmail.com", id));
    getMenu();
  };

  // edit food dish
  // const editFoodDish = async () => {
  //   setAddShowModal(true);
  //   setDishName(dishName);
  //   setPrice(Number(price));
  //   const dishRef = doc(db, "brijenma@gmail.com", id);
  //   await updateDoc(dishRef, {
  //     dishName: editDishName,
  //     price: editPrice,
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.dishContainer}>
        {/* dish name */}
        <Text style={styles.dishName}>{dishName}</Text>
        {/* price */}
        <Text style={styles.price}>Rs. {price}</Text>
      </View>

      {/* edit button */}
      <Pressable style={styles.deleteContainer}>
        <MaterialIcons name="edit" size={24} color="gray" />
      </Pressable>

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
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  dishContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    padding: 15,
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
    height: 50,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
