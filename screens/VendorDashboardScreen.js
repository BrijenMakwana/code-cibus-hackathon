import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import FoodDishVendor from "../components/FoodDishVendor";

const VendorDashboardScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* list of food dishes */}
      <FoodDishVendor />
      <FoodDishVendor />
      <FoodDishVendor />

      {/* fab button */}
      <Pressable style={styles.fab} onPress={() => setShowModal(true)}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>

      {/* QR code generate button */}
      <Pressable style={styles.qrButton}>
        <AntDesign name="qrcode" size={30} color="black" />
        <Text style={styles.qrButtonText}>generate QR code</Text>
      </Pressable>

      {/* modal */}
      <Modal visible={showModal}>
        <SafeAreaView>
          {/* close button */}
          <Pressable onPress={() => setShowModal(false)}>
            <Entypo
              name="circle-with-cross"
              size={30}
              color="red"
              style={styles.close}
            />
          </Pressable>

          {/* inputs */}
          <TextInput placeholder="dish name" style={styles.input} />
          <TextInput
            placeholder="price"
            keyboardType="decimal-pad"
            style={styles.input}
          />

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Cancel" />
            <Button title="Add" />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default VendorDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    backgroundColor: "#FF8787",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 70,
    right: 50,
  },
  qrButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF8787",
    width: 200,
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 70,
    left: 50,
  },
  qrButtonText: {
    fontSize: 16,
    textTransform: "capitalize",
    marginLeft: 10,
  },
  close: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10,
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
});
