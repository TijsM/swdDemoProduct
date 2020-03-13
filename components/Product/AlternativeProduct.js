import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function AlternativeProduct(props) {
  console.log(props.product);
  return (
    <View>
      <Text>this is an alternative product</Text>
      <Text>{props.product.Name}</Text>
    </View>
  );
}
