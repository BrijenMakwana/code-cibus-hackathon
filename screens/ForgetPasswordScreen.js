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
import { auth, sendPasswordResetEmail } from "../firebase/index";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
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

  //   reset password email
  const resetPassword = () => {
    if (email === "") {
      Alert.alert("Missing email", "please enter your email");
    } else {
      if (validateEmail(email)) {
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            setIsLoading(false);
            navigation.goBack();
            Alert.alert(
              "Reset Password",
              "we sent you an email containing a link to reset your password, check spam also "
            );
          })
          .catch((error) => {
            setIsLoading(false);
            const errorCode = error.code;

            if (errorCode === "auth/user-not-found") {
              Alert.alert(
                "No Account found",
                "we don't have any account with this email"
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
      {/* forget password image */}
      <Image
        source={require("../assets/images/forget_password.png")}
        style={styles.loginImage}
      />

      {/* inputs */}
      <CustomInput
        placeholderText="Email"
        inputValue={email}
        onChangeFunction={setEmail}
        onSubmitFunction={resetPassword}
      />

      {/* sign in */}
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <CustomButton
          buttonText="reset password"
          onPressFunction={resetPassword}
        />
      )}
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;

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
});
