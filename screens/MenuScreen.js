import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import FoodDishConsumer from "../components/FoodDishConsumer";
import { db, collection, getDocs } from "../firebase/index";
import { useRoute } from "@react-navigation/native";
import colors from "../constants/colors";

const MenuScreen = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const route = useRoute();
  const [collectionName, setCollectionName] = useState(
    route.params.collectionName
  );

  // get food menu
  const getMenu = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    setFoodMenu(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* heading */}
      <View style={styles.header}>
        {/* heading image */}
        <Image
          source={require("../assets/images/menu.png")}
          style={styles.headingImage}
        />
        <Text style={styles.totalDishes}>({foodMenu.length})</Text>
      </View>
      <View style={styles.listContainer}>
        {foodMenu && (
          <FlatList
            data={foodMenu}
            renderItem={({ item }) => (
              <FoodDishConsumer dishName={item.dishName} price={item.price} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headingImage: {
    width: 230,
    height: 50,
    marginLeft: 20,
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
    flex: 1,
  },
});
