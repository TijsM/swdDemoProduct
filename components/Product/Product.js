import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AlternativeProduct from "./AlternativeProduct";
import { ScrollView } from "react-native-gesture-handler";

export default function Product(props) {
  let jsx;

  if(props.data.Alternatives){
    jsx = props.data.Alternatives.map(id => {
    return <AlternativeProduct key={id} id={id} />;
  });
  }

  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data.Product}</Text>
      <Text>barcode: {props.data.Barcode.text}</Text>
      <Text>id: {props.id}</Text>
      <Text style={styles.subtitle}>Alternatieven: </Text>
      <ScrollView horizontal={true}>{jsx?jsx: <Text style={styles.subtle}>geen Alternatieven</Text>}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    borderRadius: 16,
    marginTop: 30,
    padding: 20
  },
  title: {
    fontSize: 23,
    marginBottom: 15
  },
  subtitle: {
    fontSize: 17,
    margin: 20,
    marginBottom: 0
  }, subtle:{
    color: '#8c8c8c',
    marginTop: 20
  }
});
