import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ScannedCodes(props) {

  let codeCards = props.codes.map(scan => {
    return (
      <View style={styles.card} key={Math.random()}>
        <Text style={styles.type}>type: {scan.type}</Text>
        <Text style={styles.data}>link: {scan.data}</Text>
      </View>
    );
  });
  return <ScrollView>{codeCards}</ScrollView>;
}

const styles = StyleSheet.create({
  card: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    marginVertical: 20,
    borderRadius: 15,
    padding: 20
  },
  type: {
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    padding: 5
  },
  data: {
    padding: 5
  }
});
