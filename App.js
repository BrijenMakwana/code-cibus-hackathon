import { StatusBar } from "expo-status-bar";
import { StyleSheet, Pressable, LogBox } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import VendorDashboardScreen from "./screens/VendorDashboardScreen";
import VendorSignInScreen from "./screens/VendorSignInScreen";
import QRScanScreen from "./screens/QRScanScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorSignUpScreen from "./screens/VendorSignUpScreen";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { auth, signOut } from "./firebase/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "./constants/colors";
import OnboardingScreen from "./screens/OnboardingScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // sign out
  const signOutUser = (navigation) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        removeUserFromLocalStorage();
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
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

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

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
          options={{ headerShown: false }}
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
          name="ForgetPassword"
          component={ForgetPasswordScreen}
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
                <MaterialIcons name="logout" size={24} color={colors.font} />
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
          options={({ navigation }) => ({
            title: null,
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                }}
              >
                <Entypo name="home" size={24} color={colors.font} />
              </Pressable>
            ),
          })}
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
