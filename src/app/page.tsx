"use server";
import Link from "next/link";
import { getProducts } from "./actions/products";
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
      <Suspense fallback={<h1>Loading...</h1>}>
        <Navbar />
        <ProductsListing products={products} />
      </Suspense>
    </>
  );
}
