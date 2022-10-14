import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import VendorDashboardScreen from "./screens/VendorDashboardScreen";
import VendorSignInScreen from "./screens/VendorSignInScreen";

export default function App() {
  return <VendorDashboardScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
