import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as consts from "../../constants/airtable";

export default function AlternativeProduct(props) {
  const [product, setProduct] = useState();

  console.log("props:");
  console.log(props);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.airtable.com/v0/app9kjur4Xg1qee7O/Products/${props.id}`,
        {
          headers: {
            Authorization: "Bearer " + consts.AIRTABLE_KEY
          }
        }
      );
      setProduct(await res.json());
    };

    fetchData();
  }, []);

  console.log("product from API:");
  console.log(JSON.stringify(product));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product ? product.fields.Name : "loading"}</Text>
      <Text>{props.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    flex: 1,
    marginTop: 25,
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#abd4ff", 
    marginHorizontal: 30,
    borderRadius: 20
  },
  title:{
    fontSize: 12
  }


});
