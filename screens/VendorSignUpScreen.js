import { StyleSheet, SafeAreaView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  auth,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "../firebase/index";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const VendorSignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // check if valid email or not
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  // sign up
  const signUp = () => {
    if (email === "" || password === "") {
      Alert.alert("Missing fields", "please enter all the fields");
    } else {
      if (validateEmail(email)) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            if (user) {
              sendEmailVerification(auth.currentUser).then(() => {
                // Email verification sent!
                // ...
                Alert.alert(
                  "Verify Email",
                  "please verify your email address by clicking on the confirmation link we sent to your registered email, also check spam"
                );
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    navigation.goBack();
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              });
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;

            if (errorCode === "auth/weak-password") {
              Alert.alert(
                "Weak Password",
                "Password should be at least 6 characters"
              );
            } else if (errorCode === "auth/email-already-in-use") {
              Alert.alert(
                "Already Registered",
                "We already have a account with this email"
              );
            }
          });
      } else {
        Alert.alert("Invalid Email", "please a valid email address");
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* register */}
      <Image
        source={require("../assets/images/register.png")}
        style={styles.registerImage}
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
        isSecure={true}
        onSubmitFunction={signUp}
      />

      {/* sign up */}
      <CustomButton buttonText="register" onPressFunction={signUp} />
    </SafeAreaView>
  );
};

export default VendorSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  registerImage: {
    height: 150,
    width: 320,
  },
});
