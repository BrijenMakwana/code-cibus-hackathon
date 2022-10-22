import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { db, doc, deleteDoc, updateDoc } from "../firebase/index";
import colors from "../constants/colors";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const FoodDishVendor = (props) => {
  const { id, dishName, price, colectionName, getMenu } = props;
  const [showEditModal, setEditShowModal] = useState(false);
  const [newDishName, setNewDishName] = useState(dishName);
  const [newPrice, setNewPrice] = useState(price);
  const [isLoading, setIsloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // delete food dish
  const deleteFoodDish = async () => {
    setIsDeleting(true);

    await deleteDoc(doc(db, colectionName, id));

    if (Platform.OS === "android") {
      ToastAndroid.show(`${dishName} is deleted 🥙`, ToastAndroid.SHORT);
    }
    getMenu();
    // setIsDeleting(false);
  };

  // edit food dish
  const editFoodDish = async () => {
    if (newDishName === "" || newPrice == "") {
      Alert.alert("Missing fields", "please enter all the fields");
    } else {
      if (!isNaN(newPrice)) {
        setIsloading(true);

        const dishRef = doc(db, colectionName, id);
        await updateDoc(dishRef, {
          dishName: newDishName,
          price: newPrice,
        });
        setEditShowModal(false);
        setIsloading(false);
        if (Platform.OS === "android") {
          ToastAndroid.show(`edited`, ToastAndroid.SHORT);
        }
        getMenu();
      } else {
        Alert.alert("Invalid Price", "please enter a valid price");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dishContainer}>
        {/* dish name */}
        <Text style={styles.dishName}>{dishName}</Text>
        {/* price */}
        <Text style={styles.price}>Rs.{price}</Text>
      </View>

      <View style={styles.actionButtonsContainer}>
        {isDeleting ? (
          <ActivityIndicator size="small" color="#FF1E00" />
        ) : (
          <>
            {/* edit */}
            <Pressable
              style={styles.deleteContainer}
              onPress={() => setEditShowModal(true)}
            >
              <MaterialIcons name="edit" size={24} color={colors.font} />
            </Pressable>
            {/* delete */}
            <Pressable style={styles.deleteContainer} onPress={deleteFoodDish}>
              <MaterialIcons name="delete" size={27} color={colors.secondary} />
            </Pressable>
          </>
        )}
      </View>

      {/* edit food dish modal */}
      <Modal visible={showEditModal} animationType="slide">
        <SafeAreaView style={styles.editModal}>
          {/* close button */}
          <Pressable
            onPress={() => {
              setNewDishName(dishName);
              setNewPrice(price);
              setEditShowModal(false);
            }}
          >
            <Entypo
              name="circle-with-cross"
              size={30}
              color={colors.secondary}
              style={styles.close}
            />
          </Pressable>

          {/* inputs */}
          <CustomInput
            placeholderText="Dish Name"
            inputValue={newDishName}
            onChangeFunction={setNewDishName}
          />
          <CustomInput
            placeholderText="Price"
            inputValue={newPrice}
            onChangeFunction={setNewPrice}
            isNumericKeyboard={true}
            onSubmitFunction={editFoodDish}
          />

          {/* buttons */}
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <View style={styles.buttonContainer}>
              {/* cancel */}
              <CustomButton
                buttonText="cancel"
                onPressFunction={() => setEditShowModal(false)}
              />
              {/* edit */}
              <CustomButton buttonText="edit" onPressFunction={editFoodDish} />
            </View>
          )}
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
    minWidth: 50,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    backgroundColor: colors.third,
    alignItems: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    width: 100,
  },
  deleteContainer: {
    height: 60,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  editModal: {
    backgroundColor: colors.background,
    flex: 1,
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
