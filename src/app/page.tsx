"use server";
import { getProducts } from "./actions/products";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import ProductsListing from "./components/ProductsListing";
import { Suspense } from "react";
export default async function Home() {
  const products = await getProducts();

  if (!products) {
    return <h1>No products found</h1>;
  }
  return (
    <>
      <ProductsListing products={products} />
    </>
  );
}
