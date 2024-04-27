"use client";
import React, { useEffect, useState } from "react";
import { Product, getProductsByFilter } from "../actions/products";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsListing({ products }: { products: Product[] }) {
  const [productList, setProductList] = useState<Product[]>(products);
  const params = useSearchParams();
  useEffect(() => {
    const date = params.get("date");
    const zipCode = params.get("zipcode");
    if (zipCode && date) {
      const fetchFilteredProducts = async () => {
        const newProducts: Product[] = await getProductsByFilter(date);
        setProductList(newProducts);
      };
      fetchFilteredProducts();
    }
  }, [params]);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Bounce Houses
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productList
            .filter(
              (product) => product.category.toLowerCase() === "bounce house"
            )
            .map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/inventory/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Add Ons
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productList
            .filter(
              (product) => product.category.toLowerCase() !== "bounce house"
            )
            .map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/inventory/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
