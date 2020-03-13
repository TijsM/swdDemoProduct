import React, {useState, useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as consts from "../../constants/airtable";

export default function AlternativeProduct(props) {

  const [product, setProduct] = useState();

  console.log("props:")
  console.log(props);

  useEffect(() => {
    const fetchData  = async ()=> {
      const res =  await fetch(`https://api.airtable.com/v0/app9kjur4Xg1qee7O/Products/${props.id}`,{
        headers:{
          "Authorization": "Bearer " + consts.AIRTABLE_KEY
        }
      })
      console.log(await res.json())
      // setProduct(await res.json())
    }

    fetchData();
  }, [])

  console.log('product from API:')
  console.log(JSON.stringify(product));
  



  return (
    <View>
      <Text>alternatief id: {props.id}</Text>
      <Text>alternatief naam: {product?product.fields.Name: "loading"}</Text>
    </View>
  );
}
