import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import FoodDishConsumer from "../components/FoodDishConsumer";

const MenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FoodDishConsumer />
      <FoodDishConsumer />
      <FoodDishConsumer />
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
