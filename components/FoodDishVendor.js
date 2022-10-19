import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { db, doc, deleteDoc, updateDoc } from "../firebase/index";
import colors from "../constants/colors";

const FoodDishVendor = (props) => {
  const { id, dishName, price, colectionName, getMenu } = props;
  const [showAddModal, setAddShowModal] = useState(false);
  const [newDishName, setNewDishName] = useState(dishName);
  const [newPrice, setNewPrice] = useState(price);

  // delete food dish
  const deleteFoodDish = async () => {
    await deleteDoc(doc(db, colectionName, id));
    getMenu();
  };

  // edit food dish
  const editFoodDish = async () => {
    setAddShowModal(false);
    const dishRef = doc(db, "brijenma@gmail.com", id);
    await updateDoc(dishRef, {
      dishName: newDishName,
      price: newPrice,
    });

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

      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.third,
          alignItems: "center",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        {/* edit button */}
        <Pressable
          style={styles.deleteContainer}
          onPress={() => setAddShowModal(true)}
        >
          <MaterialIcons name="edit" size={24} color="#EFEFEF" />
        </Pressable>

        {/* delete button */}
        <Pressable style={styles.deleteContainer} onPress={deleteFoodDish}>
          <MaterialIcons name="delete" size={27} color="#3C4048" />
        </Pressable>
      </View>

      {/* edit food dish modal */}
      <Modal visible={showAddModal} animationType="slide">
        <SafeAreaView>
          {/* close button */}
          <Pressable
            onPress={() => setAddShowModal(false)}
            style={styles.close}
          >
            <Entypo name="circle-with-cross" size={30} color="red" />
          </Pressable>

          {/* inputs */}
          <TextInput
            placeholder="dish name"
            style={styles.input}
            value={newDishName}
            onChangeText={(text) => setNewDishName(text)}
          />
          <TextInput
            placeholder="price"
            keyboardType="decimal-pad"
            style={styles.input}
            value={newPrice}
            onChangeText={(text) => setNewPrice(text)}
          />

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setAddShowModal(false)} />
            <Button title="Edit" onPress={editFoodDish} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default FoodDishVendor;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 3,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    borderRadius: 15,
  },
  dishContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: 20,
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
  input: {
    width: "90%",
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  close: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10,
  },
});
