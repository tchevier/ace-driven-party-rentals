import { getProductById } from "@/app/actions/products";
import ProductPage from "../ProductPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { product, error } = await getProductById(params.id);
  if (error) {
    return <h1>{error}</h1>;
  }
  if (product) return <ProductPage product={product} />;
}
