import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Product from "../components/Product/Product";


export default function ScannedCodes(props) {
  // const [productAlternatives, setProductAlternatives] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getProductAlternatives();
  //     setProductAlternatives(result);
  //   };
  //   fetchData();
  // }, []);


  // const getAlternativesProduct = (barcode) =>  {    
  //   let alternatives = null;

    
  //   productAlternatives.forEach((productAlternative) => {
  //     if(productAlternative.fields.OriginalProducts){
  //       if(productAlternative.fields.OriginalProducts.includes(barcode)){
  //         alternatives = productAlternative.fields;
  //       }
  //     }
  //   })
  //   return alternatives
  // }


  const productJSX = props.products.map(prod => {
    return (
      <Product
        key={Math.random()}
        data={prod.fields}
        id={prod.id}

      />
    );
  });

  return productJSX;
}

const styles = StyleSheet.create({
  card: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    marginVertical: 20,
    borderRadius: 15,
    padding: 20
  }
});
