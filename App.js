import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import VendorDashboardScreen from "./screens/VendorDashboardScreen";
import VendorSignInScreen from "./screens/VendorSignInScreen";
import QRScanScreen from "./screens/QRScanScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VendorSignIn" component={VendorSignInScreen} />
        <Stack.Screen
          name="VendorDashboard"
          component={VendorDashboardScreen}
        />
        <Stack.Screen name="QRScan" component={QRScanScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
