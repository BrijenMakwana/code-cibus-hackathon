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

  // sign up
  const signUp = () => {
    if (email === "" || password === "") {
      Alert.alert("Missing fields", "please enter all the fields");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              // ...
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
          const errorMessage = error.message;
          alert(error.message);
        });
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
