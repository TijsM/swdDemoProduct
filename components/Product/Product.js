import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ProductSpecs from "./ProductSpecs";

export default function Product(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.productImage} source={{ uri: props.imageUri }} />

      <ProductSpecs
        score={props.score}
        productName={props.productName}
        kcal={props.kcal}
        points={props.points}
      ></ProductSpecs>

      <Text style={styles.description}>{props.description}</Text>
      <View style={styles.alternatives}>
        <Text style={styles.alternativesText}>show alternatives</Text>
      </View>
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
  },
  productImage: {
    width: "90%",
    height: 150,
    margin: "auto",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: '5%'
  },
  description:{
    margin: 20,
    marginTop: 0
  },
  alternatives:{
    backgroundColor: '#rgba(121, 208, 241, 0.2)',
    width: 160, 
    padding: 10,
    margin: 10,
    borderRadius: 5
  }, 
  alternativesText:{
    color: '#79D0F1',
    fontSize: 16,
    width: '100%',
    textAlign: 'center'
  }
});
