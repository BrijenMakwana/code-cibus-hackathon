import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FoodDishConsumer from "../components/FoodDishConsumer";
import { db, collection, getDocs } from "../firebase/index";

const MenuScreen = () => {
  const [foodMenu, setFoodMenu] = useState([]);

  // get food menu
  const getMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "brijenma@gmail.com"));
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
