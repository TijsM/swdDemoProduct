import Airtable from "airtable";
import * as consts from "../constants/airtable";

let base = new Airtable({ apiKey: consts.AIRTABLE_KEY }).base(consts.BASE_KEY);

export const getProducts = () => {
  const products = base("Products")
    .select()
    .all();
  return products;
};

export const getProductAlternatives = () => {
  const productAlternatives = base("ProductAlternatives")
    .select()
    .all();

  return productAlternatives;
};

export const getImprovements = () => {
  const improvemements = base("Targets")
    .select()
    .all();
};

