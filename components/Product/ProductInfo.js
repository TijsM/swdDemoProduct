import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as consts from "../../constants/airtable";

export default function ProductInfo(props) {
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${props.barcode}.json`
      );
      res = await res.json();

      setInfo(res);
    };
    fetchData();
  }, []);

  let jsx = undefined;

  let nutrients = undefined;
  if (info) {
    if (info.status === 1) {
      //-- NUTRI WAARDEN
      if (Object.keys(info.product.nutrient_levels).length !== 0) {
        nutrients = Object.keys(info.product.nutrient_levels).map(entry => {
          console.log(entry);
          console.log(info.product.nutrient_levels[entry]);

          return (
            <Text>
              {entry}: {info.product.nutrient_levels[entry]}
            </Text>
          );
        });
      } else {
        return <Text style={styles.subtle}>geen informatie over de nutri waarden</Text>;
      }


      //-- NUTRIMENTS

      

      //-- CONTAINER
      jsx = (
        <View>
          <Text>barcode: {props.barcode}</Text>
          <Text style={styles.subtitle}>Nutri waarden: </Text>
          <View style={styles.nutriContainer}>{nutrients}</View>
        </View>
      );
    } else {
      jsx = (
        <Text style={{ marginTop: 20 }}>geen extra informatie beschikbaar</Text>
      );
    }
  } else {
    jsx = <Text>Loading</Text>;
  }
  return <View>{jsx}</View>;
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 17,
    margin: 20,
    marginBottom: 0
  },
  nutriContainer: {
    margin: 10,
    marginLeft: 0
  }, 
  subtle: {
    color: "#8c8c8c",
    marginTop: 20
  }
});
