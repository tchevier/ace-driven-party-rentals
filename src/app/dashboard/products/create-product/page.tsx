"use client";
import { Product, addProduct, successMessage } from "@/app/api/products";
import DashboardNav from "@/app/components/DashboardNav";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { Category, getCategories } from "@/app/api/categories";

export default function CreateProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState<Product>({
        id: "",
        name: "",
        price: 0,
        description: "",
        images: [],
        dimensions: "",
        category: "",
        quantity: 1,
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (productData.images.length !== 0) {
            const imageRefs = productData.images.map(async (image) => {
                const storageRef = ref(
                    storage,
                    `${productData.name}/${image.name}`
                );
                await uploadBytes(storageRef, image)
                return storageRef;
            });
        }
        addProduct(productData);
        router.push("/dashboard/products");
    };

    useEffect(() => {
        getCategories(setCategories);
    }, []);

    return (
        <div className="flex min-h-[100vh] bg-white">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12 p-5">
                    <div className="">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Add a Product
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Complete the form to add a product to the database
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className=" ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="rainbow castle"
                                        value={productData.name}
                                        onChange={(e) =>
                                            setProductData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="$100"
                                        value={productData.price}
                                        onChange={(e) =>
                                            setProductData((prev) => ({
                                                ...prev,
                                                price: parseInt(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={productData.description} // Use value prop for controlled textarea
                                        onChange={(e) =>
                                            setProductData((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a description about the product to
                                    help customers learn more.
                                </p>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Product Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            const files =
                                                                Array.from(
                                                                    e.target
                                                                        .files
                                                                ); // Convert FileList to array
                                                            setProductData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    images: files,
                                                                })
                                                            );
                                                        }
                                                    }}
                                                    multiple
                                                />
                                            </label>

                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Dimensions
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="dimensions"
                                        id="dimensions"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="36'L x 15'W x 19'H"
                                        value={productData.dimensions}
                                        onChange={(e) =>
                                            setProductData((prev) => ({
                                                ...prev,
                                                dimensions: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"
                                        autoComplete="category-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        value={productData.category}
                                        onChange={(e) =>
                                            setProductData((prev) => ({
                                                ...prev,
                                                category: e.target.value,
                                            }))
                                        }
                                    >
                                        {categories?.map(
                                            (category: Category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.name}
                                                >
                                                    {category.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="10"
                                        value={productData.quantity}
                                        onChange={(e) =>
                                            setProductData((prev) => ({
                                                ...prev,
                                                quantity: parseInt(
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 mb-6 me-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
