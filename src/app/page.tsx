"use server";
import Link from "next/link";
import { getProducts } from "./actions/products";
import Navbar from "./components/Navbar";
import ProductsListing from "./components/ProductsListing";
export default async function Home() {
  const products = await getProducts();

  if (!products) {
    return <h1>No products found</h1>;
  }
  return (
    <>
      <Navbar />
      <ProductsListing products={products}/>
    </>
  );
}
