"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Category, addCategory } from "@/app/api/categories";

export default function CreateCategory() {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState<Category>({
        id: "",
        name: "",
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        addCategory(categoryData);
        router.push("/dashboard/categories");
    };

    return (
        <div className="flex min-h-[100vh] bg-white">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12 p-5">
                    <div className="">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Add a Category
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Complete the form to add a category to the database
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
                                        autoComplete="family-name"
                                        className=" ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Bounce Houses"
                                        value={categoryData.name}
                                        onChange={(e) =>
                                            setCategoryData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-x-6 ms-5">
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
