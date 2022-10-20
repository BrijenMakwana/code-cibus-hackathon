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
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import FoodDishVendor from "../components/FoodDishVendor";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { db, collection, addDoc, docs, getDocs, auth } from "../firebase/index";
import colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const VendorDashboardScreen = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const [colectionName, setCollectionName] = useState(auth.currentUser.email);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState(0);
  const ref = useRef();

  const [showAddModal, setAddShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // add food dish to menu
  const addFoodDish = async () => {
    setAddShowModal(false);
    try {
      const docRef = await addDoc(collection(db, colectionName), {
        dishName: dishName,
        price: price,
      });
      getMenu();
      setDishName("");
      setPrice(0);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // get food menu
  const getMenu = async () => {
    const querySnapshot = await getDocs(collection(db, colectionName));

    setFoodMenu(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // download QR code
  const downloadQRCode = async () => {
    await ref.current.capture().then(async (uri) => {
      console.log("do something with ", uri);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      console.log(status, "status");
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        MediaLibrary.createAlbumAsync("Cibus", asset)
          .then(() => {
            console.log("Album created!");
            alert("QR code is downloaded. Check your gallary.");
          })
          .catch((error) => {
            console.log("err", error);
          });
      }
    });
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* heading */}
      <View style={styles.header}>
        <Text style={styles.headingText}>Food Menu</Text>
        <Text style={styles.totalDishes}>({foodMenu.length})</Text>
      </View>
      <View style={styles.listContainer}>
        {/* list of food dishes */}
        {foodMenu && (
          <FlatList
            data={foodMenu}
            renderItem={({ item }) => (
              <FoodDishVendor
                colectionName={colectionName}
                dishName={item.dishName}
                price={item.price}
                id={item.id}
                getMenu={getMenu}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        {/* fab button */}
        <Pressable style={styles.fab} onPress={() => setAddShowModal(true)}>
          <AntDesign name="plus" size={24} color={colors.font} />
        </Pressable>

        {/* QR code generate button */}
        <Pressable style={styles.qrButton} onPress={() => setShowQRModal(true)}>
          <AntDesign name="qrcode" size={30} color={colors.font} />
          <Text style={styles.qrButtonText}>generate QR code</Text>
        </Pressable>
      </View>

      {/* add food dish modal */}
      <Modal visible={showAddModal} animationType="slide">
        <SafeAreaView>
          {/* close button */}
          <Pressable onPress={() => setAddShowModal(false)}>
            <Entypo
              name="circle-with-cross"
              size={30}
              color={colors.secondary}
              style={styles.close}
            />
          </Pressable>

          {/* inputs */}
          <CustomInput
            placeholderText="dish name"
            inputValue={dishName}
            onChangeFunction={setDishName}
          />
          <CustomInput
            placeholderText="price"
            inputValue={price}
            onChangeFunction={setPrice}
            isNumericKeyboard={true}
          />

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              buttonText="cancel"
              onPressFunction={() => setAddShowModal(false)}
            />
            <CustomButton buttonText="add" onPressFunction={addFoodDish} />
          </View>
        </SafeAreaView>
      </Modal>

      {/* QR code modal */}
      <Modal visible={showQRModal} animationType="slide">
        <SafeAreaView style={styles.qrModal}>
          {/* close button */}
          <Pressable onPress={() => setShowQRModal(false)} style={styles.close}>
            <Entypo name="circle-with-cross" size={30} color="red" />
          </Pressable>
          {/* heading */}
          <Text style={styles.heading}>congratulations!!</Text>
          {/* QR */}
          <>
            <ViewShot
              ref={ref}
              options={{
                fileName: "Your-File-Name",
                format: "jpg",
                quality: 0.9,
              }}
            >
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${colectionName}`,
                }}
                style={styles.qrImage}
              />
            </ViewShot>
          </>

          {/* download text */}
          <Text style={styles.readyText}>
            Your QR code is ready, You can download it from here.
          </Text>

          {/* download button */}
          <Pressable style={styles.downloadBtn} onPress={downloadQRCode}>
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
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontSize: 30,
    color: colors.font,
    marginLeft: 30,
    fontWeight: "600",
  },
  totalDishes: {
    fontSize: 40,
    color: colors.secondary,
    marginLeft: 10,
    fontWeight: "600",
  },
  listContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.background,
    paddingTop: 10,
    // paddingBottom: 80,
    flex: 1,
  },
  fab: {
    backgroundColor: colors.secondary,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 40,
    right: 50,
  },
  qrButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondary,
    width: 200,
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    left: 50,
  },
  qrButtonText: {
    fontSize: 16,
    textTransform: "capitalize",
    marginLeft: 10,
    color: colors.font,
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
    backgroundColor: colors.primary,
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
