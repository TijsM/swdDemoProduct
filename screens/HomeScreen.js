import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Product from "../components/Product/Product";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Product 
        productName="test product"
        imageUri="https://images.unsplash.com/photo-1532109088195-681b71de5705?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80"
        score="5,2"
        kcal="237"
        points="12"
        description="Chocolate is a treat, but nbetter alternatives are available with as much taste"
      ></Product>
      <Product 
        productName="test product"
        imageUri="https://images.unsplash.com/photo-1532109088195-681b71de5705?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80"
        score="5,2"
        kcal="237"
        points="12"
        description="Chocolate is a treat, but nbetter alternatives are available with as much taste"
      ></Product>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
