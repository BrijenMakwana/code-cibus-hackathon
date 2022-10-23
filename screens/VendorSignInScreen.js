import {
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword } from "../firebase/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const VendorSignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // check if valid email or not
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // sign in
  const signIn = () => {
    if (email === "" || password === "") {
      Alert.alert("Missing fields", "please enter all the fields");
    } else {
      if (validateEmail(email)) {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setIsLoading(false);
            if (user) {
              if (user.emailVerified) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "VendorDashboard" }],
                });

                storeUser(user);
              } else {
                Alert.alert(
                  "Verify Email",
                  "please verify your email address by clicking on the confirmation link we sent to your registered email, also check spam"
                );
              }
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            setIsLoading(false);
            if (
              errorCode === "auth/wrong-password" ||
              errorCode === "auth/user-not-found"
            ) {
              Alert.alert(
                "Invalid Credentials",
                "please try again with correct credentials"
              );
            }
          });
      } else {
        Alert.alert("Invalid Email", "please a valid email address");
      }
    }
  };

  // go to register screen
  const goToSignUpScreen = () => {
    navigation.navigate("VendorSignUp");
  };

  // go to forget password screen
  const goToForgetPasswordScreen = () => {
    navigation.navigate("ForgetPassword");
  };

  // store user in local storage
  const storeUser = async (user) => {
    try {
      await AsyncStorage.setItem("logged_in_user", user.email);
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* login image */}
      <Image
        source={require("../assets/images/login.png")}
        style={styles.loginImage}
      />

      {/* inputs */}
      <CustomInput
        placeholderText="Email"
        inputValue={email}
        onChangeFunction={setEmail}
      />
      <CustomInput
        placeholderText="Password"
        inputValue={password}
        onChangeFunction={setPassword}
        onSubmitFunction={signIn}
        isSecure={true}
      />

      {/* sign in */}
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <CustomButton buttonText="login" onPressFunction={signIn} />
      )}

      {/* new account */}
      <Pressable onPress={goToSignUpScreen} style={styles.newACContainer}>
        <Text style={styles.newAC}>create a new account</Text>
      </Pressable>

      {/*  forget password */}
      <Pressable
        onPress={goToForgetPasswordScreen}
        style={styles.forgetPasswordContainer}
      >
        <Text style={styles.forgetPassword}>forget password</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default VendorSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  loginImage: {
    height: 150,
    width: 320,
  },
  forgetPasswordContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  forgetPassword: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary,
    textTransform: "capitalize",
  },

  newACContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  newAC: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary,
    textTransform: "capitalize",
  },
});
