"use server";
import { getProducts } from "./actions/products";
import ProductsListing from "./components/ProductsListing";
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
