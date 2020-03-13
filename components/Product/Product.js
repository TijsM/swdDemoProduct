import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AlternativeProduct from "./AlternativeProduct";
import * as consts from "../../constants/airtable";


export default function Product(props) {


  
  return (
    <View style={styles.container}>
      <Text>name: {props.data.Product}</Text>
      <Text>barcode: {props.data.Barcode.text}</Text>
      <Text>id: {props.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    borderRadius: 16,
    marginTop: 30
  }
});