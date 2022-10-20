import {
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword } from "../firebase/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const VendorSignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // sign in
  const signIn = () => {
    if (email === "" || password === "") {
      Alert.alert("Missing fields", "please enter all the fields");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          if (user) {
            if (user.emailVerified) {
              navigation.reset({
                index: 0,
                routes: [{ name: "VendorDashboard" }],
              });

              storeUser(user);
            } else {
              alert(
                "please verify your email address by clicking on the confirmation link sent to your registered email id"
              );
            }
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
        });
    }
  };

  // go to register screen
  const goToSignUpScreen = () => {
    navigation.navigate("VendorSignUp");
  };

  // store user in local storage
  const storeUser = async (user) => {
    try {
      await AsyncStorage.setItem("logged_in_user", user.email);
    } catch (e) {
      // saving error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* login */}
      <Image
        source={require("../assets/images/login.png")}
        style={styles.loginImage}
      />

      {/* inputs */}
      <CustomInput
        placeholderText="enter your email"
        inputValue={email}
        onChangeFunction={setEmail}
      />
      <CustomInput
        placeholderText="password"
        inputValue={password}
        onChangeFunction={setPassword}
        onSubmitFunction={signIn}
        isSecure={true}
      />

      {/* sign in button */}
      <CustomButton buttonText="login" onPressFunction={signIn} />

      {/* new account */}
      <Pressable onPress={goToSignUpScreen} style={styles.newACContainer}>
        <Text style={styles.newAC}>create a new account</Text>
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
  newACContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  newAC: {
    fontSize: 15,

    fontWeight: "500",
    color: colors.primary,
  },
});
