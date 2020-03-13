import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AlternativeProduct from "./AlternativeProduct";

export default function Product(props) {
  return (
    <View style={styles.container}>
      <Text>name: {props.name}</Text>
      <Text>id: {props.id}</Text>
      {props.alternatives ? <AlternativeProduct product={props.alternatives} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    borderRadius: 16,
    marginTop: 25
  }
});
