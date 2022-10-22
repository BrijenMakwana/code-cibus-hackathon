import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

const DishSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      title: route.params.dishName,
    });
  }, []);

  return (
    <View>
      <Text>{route.params.dishName}</Text>
    </View>
  );
};

export default DishSearchScreen;

const styles = StyleSheet.create({});
