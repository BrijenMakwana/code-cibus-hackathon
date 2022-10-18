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

const VendorDashboardScreen = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const [colectionName, setCollectionName] = useState(auth.currentUser.email);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState(0);
  const ref = useRef();
  const [qrCode, setQRCode] = useState(null);

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
      console.log("Document written with ID: ", docRef.id);
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

  const downloadQRCode = async () => {
    ref.current.capture().then((uri) => {
      console.log("do something with ", uri);
      setQRCode(uri);
    });
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(qrCode);
      MediaLibrary.createAlbumAsync("Cibus", asset)
        .then(() => {
          console.log("Album created!");
          alert("QR code is downloaded. Check your gallary.");
        })
        .catch((error) => {
          console.log("err", error);
        });
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
              setAddShowModal={setAddShowModal}
              editDishName={dishName}
              setDishName={setDishName}
              editPrice={price}
              setPrice={setPrice}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

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
          <TextInput
            placeholder="dish name"
            style={styles.input}
            value={dishName}
            onChangeText={(text) => setDishName(text)}
          />
          <TextInput
            placeholder="price"
            keyboardType="decimal-pad"
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(Number(text))}
          />

          {/* buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setAddShowModal(false)} />
            <Button title="Add" onPress={addFoodDish} />
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
