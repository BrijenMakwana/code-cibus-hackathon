import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

export default QRScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  // check if data is a valid email or not
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    const collectionName = data.substring(36);

    if (validateEmail(collectionName)) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Menu", params: { collectionName: collectionName } }],
      });
    } else {
      Alert.alert("Not Foodora", "It's not a valid Foodora QR code", [
        {
          text: "Scan Again",
          onPress: () => setScanData(),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {!scanData && (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      )}
      {/* on top of barcode scanner */}
      <View style={styles.scanner}>
        <Text style={styles.scannerText}>scan the QR code to get menu</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.primary,
    borderStyle: "dashed",
  },
  scannerText: {
    fontSize: 18,
    color: colors.font,
    fontWeight: "500",
  },
});
