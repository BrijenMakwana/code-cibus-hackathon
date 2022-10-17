import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FoodDishConsumer from "../components/FoodDishConsumer";
import { db, collection, getDocs } from "../firebase/index";
import { useRoute } from "@react-navigation/native";

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
      {foodMenu && (
        <FlatList
          data={foodMenu}
          renderItem={({ item }) => (
            <FoodDishConsumer dishName={item.dishName} price={item.price} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
