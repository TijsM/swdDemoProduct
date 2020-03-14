import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as consts from "../../constants/airtable";

export default function Motivation(props) {
  const [motivation, setMotivation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (props.data) {
        if (props.data.fields.Improvements) {
          const improvementIDs = props.data.fields.Improvements;
          improvementIDs.forEach(async id => {
            const res = await fetch(
              `https://api.airtable.com/v0/app9kjur4Xg1qee7O/Targets/${id}`,
              {
                headers: {
                  Authorization: "Bearer " + consts.AIRTABLE_KEY
                }
              }
            );
            
            const currentState = [...motivation];
            currentState.push(await res.json());
            setMotivation(currentState);
          });
        }
      }
    };

    fetchData();
  }, [props]);

  let jsx = null;
  if (motivation.length > 0) {
    jsx = (
      <View style={styles.container}>
        <Text style={styles.text}>{motivation[0].fields.Name}</Text>
      </View>
    );
  }

  return <View>{jsx}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#87ffa5",
    padding: 5,
    borderRadius: 8,
    margin: 10,
    marginTop: 25,
    maxWidth: 125
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 12
  }
});
