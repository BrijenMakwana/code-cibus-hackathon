import { StatusBar } from "expo-status-bar";
import { StyleSheet, Pressable } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import VendorDashboardScreen from "./screens/VendorDashboardScreen";
import VendorSignInScreen from "./screens/VendorSignInScreen";
import QRScanScreen from "./screens/QRScanScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorSignUpScreen from "./screens/VendorSignUpScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, signOut } from "./firebase/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "./constants/colors";
import OnboardingScreen from "./screens/OnboardingScreen";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const signOutUser = (navigation) => {
    removeUserFromLocalStorage();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // remove user fro local storage
  const removeUserFromLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem("logged_in_user");
    } catch (e) {
      // remove error
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ title: "Cibus", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorSignIn"
          component={VendorSignInScreen}
          options={{ title: null }}
        />
        <Stack.Screen
          name="VendorSignUp"
          component={VendorSignUpScreen}
          options={{ title: null }}
        />
        <Stack.Screen
          name="VendorDashboard"
          component={VendorDashboardScreen}
          options={({ navigation }) => ({
            title: null,
            headerShadowVisible: false,
            headerRight: () => (
              <Pressable onPress={() => signOutUser(navigation)}>
                <MaterialIcons name="logout" size={24} color="#fff" />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="QRScan"
          component={QRScanScreen}
          options={{ title: null, headerShadowVisible: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: null, headerShadowVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
