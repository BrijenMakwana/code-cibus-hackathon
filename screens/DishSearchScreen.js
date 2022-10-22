import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { WebView } from "react-native-webview";

const DishSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dishName, setDishName] = useState(route.params.dishName);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.dishName,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: `https://www.google.com/search?tbm=isch&q=${dishName}` }}
      />
    </SafeAreaView>
  );
};

export default DishSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
