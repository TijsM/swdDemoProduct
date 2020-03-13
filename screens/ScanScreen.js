import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getProducts, getProductAlternatives } from "../src/airtable";
import ScannedProducts from "../components/ScannedProducts";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productAlternatives, setProductAlternatives] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductAlternatives();
      setProductAlternatives(result);
    };
    fetchData();
  }, []);

  //when the code was scanned successfully, give a message with the url
  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("scanned");
    setScanned(true);

    const productFromBarcode = products.find(prod => {
      return prod.fields.Barcode.text === data;
    });

    const _scannedProds = [...scannedProducts];
    _scannedProds.push(productFromBarcode);
    setScannedProducts(_scannedProds);

    setModalVisible(false);
    setScanned(false);
  };

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

      <ScannedProducts products={scannedProducts} />

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
