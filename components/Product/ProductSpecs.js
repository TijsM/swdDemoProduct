import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProductSpecs(props) {
  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <Text>{props.score}</Text>
      </View>
      <View style={styles.specs}>
        <Text style={styles.name}>{props.productName}</Text>
        <View style={styles.kcalAndPointsContainer}>
          <Text>kcal: {props.kcal}</Text>
          <Text>points: {props.points}</Text>
        </View>
      </View>
      <Text style={styles.options}>...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginVertical: 25
  },
  score: {
    width: "15%",
    borderWidth: 1,
    borderColor: "#8F92A1",
    borderRadius: 5,
    padding: 5,
    margin: 5,
    
  },
  specs: {
    marginHorizontal: 10,
    width: "65%"
  },
  kcalAndPointsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%"
  },
  name: {
    fontWeight: "bold"
  },
  options: {
    width: "25%"
  }
});
