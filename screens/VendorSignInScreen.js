import {
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword } from "../firebase/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VendorSignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // sign in with google
  const signIn = () => {
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
      {/* app name */}
      <Text style={styles.heading}>Cibus</Text>

      {/* instruction */}
      <Text style={styles.instruction}>
        "Please sign in to create the food menu"
      </Text>
      {/* inputs */}
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="sign In" onPress={signIn} />
      <Button title="sign Up" onPress={goToSignUpScreen} />
    </SafeAreaView>
  );
};

export default VendorSignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 50,
    textAlign: "center",
    textTransform: "capitalize",
  },
  instruction: {
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
});
