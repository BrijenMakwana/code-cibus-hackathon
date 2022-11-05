import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  AntDesign,
  Entypo,
  Ionicons,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import FoodDishVendor from "../components/FoodDishVendor";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { db, collection, addDoc, docs, getDocs, auth } from "../firebase/index";
import colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CurrencyComponent from "../components/CurrencyComponent";
import { CurrencyData } from "../assets/CurrencyData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VendorDashboardScreen = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const [colectionName, setCollectionName] = useState(auth?.currentUser?.email);
  const [dishName, setDishName] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("₹");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const ref = useRef();

  const navigation = useNavigation();

  const [showAddModal, setAddShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  // add food dish to menu
  const addFoodDish = async () => {
    if (dishName === "" || price == "") {
      Alert.alert("Missing fields", "please enter all the fields");
    } else {
      if (!isNaN(price)) {
        setIsloading(true);

        try {
          await addDoc(collection(db, colectionName), {
            dishName: dishName,
            price: price,
            currency: currency,
          });
          setAddShowModal(false);
          setIsloading(false);
          if (Platform.OS === "android") {
            ToastAndroid.show(`${dishName} is added 🥙`, ToastAndroid.SHORT);
          }
          getMenu();
          setDishName("");
          setPrice(0);
        } catch (e) {
          setIsloading(false);
        }
      } else {
        Alert.alert("Invalid Price", "please enter a valid price");
      }
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
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        MediaLibrary.createAlbumAsync("Foodora", asset)
          .then(() => {
            Alert.alert(
              "Hooray 🥳🥳🥳",
              "QR code is downloaded, check your gallary."
            );
          })
          .catch((error) => {});
      }
    });
  };

  // display user email in toast message
  const getUserToastMessage = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show(
        `${colectionName} is currently logged in`,
        ToastAndroid.LONG
      );
    }
  };

  // get currency local storage
  const getCurrency = async () => {
    try {
      const localCurrency = await AsyncStorage.getItem("local_currency");
      if (localCurrency !== null) {
        setCurrency(localCurrency);
      }
    } catch (e) {}
  };

  // pull to get menu
  const pullToGetMenu = () => {
    setIsRefreshing(true);
    getMenu();
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // get menu(if any) when user open dashboard first time
  useEffect(() => {
    if (colectionName) {
      getMenu();
    }
    getCurrency();
    // set email of the vendor in header bar
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={getUserToastMessage}>
          <Feather name="user" size={30} color={colors.font} />
        </Pressable>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* heading image */}
        <Image
          source={require("../assets/images/menu.png")}
          style={styles.headingImage}
        />
        {/* total dishes */}
        <Text style={styles.totalDishes}>({foodMenu.length})</Text>
        {/* currency */}
        <Pressable
          style={styles.currencyChanege}
          onPress={() => setShowCurrencyModal(true)}
        >
          {/* <Fontisto name="money-symbol" size={30} color={colors.font} /> */}
          <Text style={styles.currency}>{currency}</Text>
        </Pressable>
      </View>
      <View style={styles.listContainer}>
        {/* list of food dishes */}
        {foodMenu.length > 0 ? (
          <FlatList
            data={foodMenu}
            renderItem={({ item }) => (
              <FoodDishVendor
                colectionName={colectionName}
                dishName={item.dishName}
                price={item.price}
                id={item.id}
                getMenu={getMenu}
                currency={item.currency}
              />
            )}
            keyExtractor={(item) => item.id}
            refreshing={isRefreshing}
            onRefresh={pullToGetMenu}
            ListFooterComponent={<View style={{ height: 100 }} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require("../assets/images/empty.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>
              add food dishes by pressing this button
            </Text>
          </View>
        )}

        {/* fab button */}
        <Pressable style={styles.fab} onPress={() => setAddShowModal(true)}>
          <Ionicons name="fast-food" size={24} color={colors.font} />
        </Pressable>

        {/* QR code generate button */}
        {foodMenu.length > 0 && (
          <Pressable
            style={styles.qrButton}
            onPress={() => setShowQRModal(true)}
          >
            <AntDesign name="qrcode" size={30} color={colors.font} />
            <Text style={styles.qrButtonText}>Get QR Code</Text>
          </Pressable>
        )}
      </View>

      {/* add food dish modal */}
      <Modal visible={showAddModal} animationType="slide">
        <SafeAreaView style={styles.addModal}>
          {/* close button */}
          <Pressable
            onPress={() => {
              setDishName("");
              setPrice(0);
              setAddShowModal(false);
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
            inputValue={dishName}
            onChangeFunction={setDishName}
          />
          <CustomInput
            placeholderText="Price"
            inputValue={price}
            onChangeFunction={setPrice}
            isNumericKeyboard={true}
            onSubmitFunction={addFoodDish}
          />

          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            // buttons container
            <View style={styles.buttonContainer}>
              {/* cancel */}
              <CustomButton
                buttonText="cancel"
                onPressFunction={() => {
                  setDishName("");
                  setPrice(0);
                  setAddShowModal(false);
                }}
              />
              {/* add */}
              <CustomButton buttonText="add" onPressFunction={addFoodDish} />
            </View>
          )}
        </SafeAreaView>
      </Modal>

      {/* QR code modal */}
      <Modal visible={showQRModal} animationType="slide">
        <SafeAreaView style={styles.qrModal}>
          {/* close button */}
          <Pressable onPress={() => setShowQRModal(false)} style={styles.close}>
            <Entypo
              name="circle-with-cross"
              size={30}
              color={colors.secondary}
            />
          </Pressable>
          {/* heading image */}
          <Image
            source={require("../assets/images/congratulations.png")}
            style={{ width: 350, height: 90 }}
          />

          {/* QR */}
          <>
            <ViewShot
              ref={ref}
              options={{
                fileName: `Foodora_${colectionName}`,
                format: "jpg",
                height: 1080,
                width: 1080,
                quality: 1,
              }}
            >
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://foodora-web-menu.vercel.app/${colectionName}&color=00ABB3`,
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
          <CustomButton
            buttonText="download"
            onPressFunction={downloadQRCode}
          />
        </SafeAreaView>
      </Modal>

      {/* currency modal */}
      <Modal visible={showCurrencyModal} animationType="slide">
        <SafeAreaView style={styles.currencyModal}>
          {/* close button */}
          <Pressable
            onPress={() => {
              setShowCurrencyModal(false);
            }}
          >
            <Entypo
              name="circle-with-cross"
              size={30}
              color={colors.secondary}
              style={styles.close}
            />
          </Pressable>

          {/* currency list */}
          <FlatList
            data={CurrencyData}
            renderItem={({ item }) => (
              <CurrencyComponent
                code={item.code}
                name={item.name}
                symbol={item.symbol}
                setCurrency={setCurrency}
                setShowCurrencyModal={setShowCurrencyModal}
                totalDishes={foodMenu.length}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
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
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  headingImage: {
    width: 230,
    height: 50,
    marginLeft: 20,
  },
  totalDishes: {
    fontSize: 35,
    color: colors.secondary,
    marginLeft: 10,
    fontWeight: "600",
    minWidth: 50,
  },
  currencyChanege: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
    minWidth: 50,
  },
  currency: {
    fontSize: 27,
    color: colors.font,
  },
  listContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.background,
    paddingTop: 10,
    flex: 1,
  },
  emptyContainer: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 250,
    height: 250,
  },
  emptyText: {
    fontSize: 15,
    color: colors.secondary,
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
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    left: 50,
  },
  qrButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.font,
    fontWeight: "500",
  },
  addModal: {
    backgroundColor: colors.background,
    flex: 1,
  },
  close: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  qrModal: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
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
    marginTop: 30,
    marginHorizontal: 20,
    textAlign: "center",
    color: colors.secondary,
    fontWeight: "500",
    marginBottom: 20,
  },
  currencyModal: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
