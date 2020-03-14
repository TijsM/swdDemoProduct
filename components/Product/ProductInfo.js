import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as consts from "../../constants/airtable";
import { ScrollView } from "react-native-gesture-handler";

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
  let nutriments = undefined;
  if (info) {
    if (info.status === 1) {
      //-- NUTRI WAARDEN
      if (Object.keys(info.product.nutrient_levels).length !== 0) {
        nutrients = Object.keys(info.product.nutrient_levels).map(entry => {
          let styleColor;
          if (info.product.nutrient_levels[entry] === "high") {
            styleColor = "nutriRed";
          } else if (info.product.nutrient_levels[entry] === "low") {
            styleColor = "nutriGreen";
          } else {
            styleColor = "nutriNeutral";
          }

          return (
            <Text style={styles[styleColor]} key={entry}>
              {entry}: {info.product.nutrient_levels[entry]}
            </Text>
          );
        });
      } else {
        return (
          <Text style={styles.subtle}>
            geen informatie over de nutri waarden
          </Text>
        );
      }

      //-- NUTRIMENTS
      if (Object.keys(info.product.nutriments).length > 0) {
        nutriments = Object.keys(info.product.nutriments).map(entry => {
          return (
            <Text style={styles.nutriNeutral} key={entry}>
              {entry}: {info.product.nutriments[entry]}
            </Text>
          );
        });
      } else {
        return (
          <Text style={styles.subtle}>geen informatie over de nutrimenten</Text>
        );
      }

      //-- CONTAINER
      jsx = (
        <View>
          <Text>barcode: {props.barcode}</Text>
          <Text style={styles.subtitle}>Relatieve nutri waarden: </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalContainer}
            horizontal={true}
          >
            {nutrients}
          </ScrollView>
          <Text style={styles.subtitle}>Absolute nutri waarden: </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalContainer}
            horizontal={true}
          >
            {nutriments}
          </ScrollView>
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
  },
  horizontalContainer: {
    marginVertical: 10
  },
  nutriNeutral: {
    backgroundColor: "#d1d1d1",
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 15,
    color: "#ffffff"
  },
  nutriRed: {
    backgroundColor: "#ff787f",
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 15,
    color: "#ffffff"
  },
  nutriGreen: {
    backgroundColor: "#78ff83",
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 15,
    color: "#ffffff"
  }
});
