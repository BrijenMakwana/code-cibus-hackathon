import {
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import FoodDishVendor from "../components/FoodDishVendor";

const VendorDashboardScreen = () => {
  const [showAddModal, setAddShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* list of food dishes */}
      <FoodDishVendor />
      <FoodDishVendor />
      <FoodDishVendor />

      {/* fab button */}
      <Pressable style={styles.fab} onPress={() => setAddShowModal(true)}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>

      {/* QR code generate button */}
      <Pressable style={styles.qrButton} onPress={() => setShowQRModal(true)}>
        <AntDesign name="qrcode" size={30} color="black" />
        <Text style={styles.qrButtonText}>generate QR code</Text>
      </Pressable>

      {/* add food dish modal */}
      <Modal visible={showAddModal} animationType="slide">
        <SafeAreaView>
          {/* close button */}
          <Pressable onPress={() => setAddShowModal(false)}>
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

      {/* QR code modal */}
      <Modal visible={showQRModal} animationType="slide">
        <SafeAreaView style={styles.qrModal}>
          {/* close button */}
          <Pressable onPress={() => setShowQRModal(false)}>
            <Entypo
              name="circle-with-cross"
              size={30}
              color="red"
              style={styles.close}
            />
          </Pressable>
          {/* heading */}
          <Text style={styles.heading}>congratulations!!</Text>
          {/* QR */}
          <Image
            source={require("../assets/images/create-qr-code.png")}
            style={styles.qrImage}
          />
          {/* download text */}
          <Text style={styles.readyText}>
            Your QR code is ready, You can download it from here.
          </Text>

          {/* download button */}
          <Pressable style={styles.downloadBtn}>
            <Text style={styles.downloadText}>download</Text>
          </Pressable>
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
  qrModal: {
    // alignItems: "center",
  },
  heading: {
    fontSize: 40,
    alignSelf: "center",
  },
  qrImage: {
    width: 300,
    height: 300,
    marginTop: 30,
    alignSelf: "center",
  },
  readyText: {
    fontSize: 20,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  downloadBtn: {
    backgroundColor: "#FF8787",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    width: 140,
    alignSelf: "center",
  },
  downloadText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
