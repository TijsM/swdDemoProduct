import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Modal,
  TouchableHighlight
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ScannedCodes from "../components/ScannedCodes";
import axios from "../axios";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);  
  const [scannedCodes, setScannedCodes] = useState([]);


  // useEffetct(()=>{}, []) without values between the squared brackets will make sure this code is triggered when the component is loaded
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

 

  //when the code was scanned successfully, give a message with the url
  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);

    let _scannedCodes = [...scannedCodes];
    _scannedCodes.push({
      date: new Date().toISOString(),
      type,
      data
    });

    axios.post("https://demonstratorrn.firebaseio.com/scans.json", {
      date: new Date().toISOString(),
      data,
      type
    });

    await getNutritionInfo(data);
    setScannedCodes(_scannedCodes);

    setModalVisible(false);
    setScanned(false);
  };

  const getNutritionInfo = async(data) => {
    const res = await axios.post(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);

    console.log(res.data.product)
    console.log('---------------')
    console.log(res.data.product.nutriscore_grade)
  }




  //checking permission
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          {/* creating the overlay */}
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
          {/* end of overlay */}
        </BarCodeScanner>
        <Button
          title={"Close camera"}
          onPress={() => {
            setModalVisible(false);
          }}
        ></Button>

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </Modal>

      <ScannedCodes codes={scannedCodes}></ScannedCodes>

      <Button
        title={"Open camera"}
        onPress={() => {
          setModalVisible(true);
        }}
      ></Button>
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row"
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  }
});
