import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Product from "../components/Product/Product";
import { ScrollView } from "react-native-gesture-handler";
import { getProducts, getProductAlternatives } from "../src/airtable";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [productAlternatives, setProductAlternatives] = useState([]);

  let productsJSX = null;
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductAlternatives();
      setProductAlternatives(result);
    };
    fetchData();
  }, []);


  const getAlternativesProduct = (barcode) =>  {    
    let alternatives = null;
    productAlternatives.forEach((productAlternative) => {
      if(productAlternative.fields.OriginalProducts){
        if(productAlternative.fields.OriginalProducts.includes(barcode)){
          alternatives = productAlternative.fields;
        }
      }
    })
    return alternatives
  }

  productsJSX = products.map(prod => {

    return (
      <Product
      key={prod.id}
      data={prod.fields}
      id={prod.id}
      />
    );
  });


  return (
    <ScrollView>
      {productsJSX}
      {/* <Product id="dslkfjsqdmfkj" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
