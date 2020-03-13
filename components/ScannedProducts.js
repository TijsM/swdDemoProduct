import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Product from "../components/Product/Product";


export default function ScannedCodes(props) {

  const productJSX = props.products.map(prod => {
    return (
      <Product
        key={Math.random()}
        data={prod.fields}
        id={prod.id}

      />
    );
  });
  return <ScrollView>{productJSX}</ScrollView>
}

const styles = StyleSheet.create({
  card: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    marginVertical: 20,
    borderRadius: 15,
    padding: 20
  }
});
