"use client";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
    CheckIcon,
    ChevronUpDownIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { Datepicker } from "flowbite-react";
import { getProductsBySearch } from "../api/products";
import Inventory from "../(public)/inventory/page";

export interface RentalTime {
    value: number;
    display: string;
}

const dropOffTimes: RentalTime[] = [
    { value: 8, display: "8:00 AM" },
    { value: 9, display: "9:00 AM" },
    { value: 10, display: "10:00 AM" },
    { value: 11, display: "11:00 AM" },
    { value: 12, display: "12:00 PM" },
    { value: 13, display: "1:00 PM" },
    { value: 14, display: "2:00 PM" },
    { value: 15, display: "3:00 PM" },
    { value: 16, display: "4:00 PM" },
    { value: 17, display: "5:00 PM" },
    { value: 18, display: "6:00 PM" },
];
const rentalDurations: RentalTime[] = [
    { value: 4, display: "4 Hours" },
    { value: 8, display: "8 Hours" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function HeroMenu() {
    const [products, setProducts] = useState<any>([]);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrowsDate = new Date(currentDate);
    const [formData, setFormData] = useState({
        rentalDate: tomorrowsDate,
        dropOffTime: dropOffTimes[0],
        rentalDuration: rentalDurations[0],
        zipCode: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const pros = await getProductsBySearch(formData);
            console.log(pros.id); // Log the products
            setProducts(pros);
            setIsSubmitted(true);
            // Proceed with handling the products data
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <>
            {isSubmitted ? (
                <Inventory />
            ) : (
                <>
                    <div className="bg-img"></div>
                    <div className="absolute left-1/2 lg:left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5  shadow-lg z-10 max-w-md w-5/6 rounded opacity-90">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Book your next party rentals.
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-10 flex justify-between">
                                <div className="w-5/12">
                                    <label
                                        htmlFor="Rental Date"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        RENTAL DATE
                                    </label>
                                    <div className="relative max-w-sm">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <Datepicker
                                            showTodayButton={false}
                                            minDate={tomorrowsDate}
                                            onSelectedDateChanged={(
                                                date: Date
                                            ) =>
                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    rentalDate: date,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-5/12">
                                    <Listbox
                                        value={formData.dropOffTime}
                                        onChange={(value: any) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                dropOffTime: value,
                                            }))
                                        }
                                    >
                                        {({ open }: any) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                                    DROP OFF TIME
                                                </Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="w-full relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
                                                        <span className="block truncate">
                                                            {
                                                                formData
                                                                    .dropOffTime
                                                                    .display
                                                            }
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {dropOffTimes.map(
                                                                (time, id) => (
                                                                    <Listbox.Option
                                                                        key={id}
                                                                        className={({
                                                                            active,
                                                                        }) =>
                                                                            classNames(
                                                                                active
                                                                                    ? "bg-green-600 text-white"
                                                                                    : "text-gray-900",
                                                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                            )
                                                                        }
                                                                        value={
                                                                            time
                                                                        }
                                                                    >
                                                                        {({
                                                                            selected,
                                                                            active,
                                                                        }) => (
                                                                            <>
                                                                                <span
                                                                                    className={classNames(
                                                                                        selected
                                                                                            ? "font-semibold"
                                                                                            : "font-normal",
                                                                                        "block truncate"
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        time.display
                                                                                    }
                                                                                </span>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active
                                                                                                ? "text-white"
                                                                                                : "text-green-600",
                                                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon
                                                                                            className="h-5 w-5"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                )
                                                            )}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div className="w-5/12">
                                    <Listbox
                                        value={formData.rentalDuration}
                                        onChange={(value) =>
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                rentalDuration: value,
                                            }))
                                        }
                                    >
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                                    RENTAL DURATION
                                                </Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="w-full relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
                                                        <span className="block truncate">
                                                            {
                                                                formData
                                                                    .rentalDuration
                                                                    .display
                                                            }
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {rentalDurations.map(
                                                                (time, id) => (
                                                                    <Listbox.Option
                                                                        key={id}
                                                                        className={({
                                                                            active,
                                                                        }) =>
                                                                            classNames(
                                                                                active
                                                                                    ? "bg-green-600 text-white"
                                                                                    : "text-gray-900",
                                                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                            )
                                                                        }
                                                                        value={
                                                                            time
                                                                        }
                                                                    >
                                                                        {({
                                                                            selected,
                                                                            active,
                                                                        }) => (
                                                                            <>
                                                                                <span
                                                                                    className={classNames(
                                                                                        selected
                                                                                            ? "font-semibold"
                                                                                            : "font-normal",
                                                                                        "block truncate"
                                                                                    )}
                                                                                >
                                                                                    {
                                                                                        time.display
                                                                                    }
                                                                                </span>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active
                                                                                                ? "text-white"
                                                                                                : "text-green-600",
                                                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon
                                                                                            className="h-5 w-5"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                )
                                                            )}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                                <div className="w-5/12">
                                    <label
                                        htmlFor="zipCode"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        EVENT ZIP CODE
                                    </label>
                                    <div className="mt-2 ">
                                        <input
                                            type="string"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={(e) =>
                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    zipCode: e.target.value,
                                                }))
                                            }
                                            className="
                                block w-full rounded-md border-0 py-1.5 ps-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                            placeholder="Enter Zip Code"
                                        />
                                        {/* <div className="pointer-events-none relative bottom-7 left-85 flex items-center pr-3">
                                            <ExclamationCircleIcon
                                                className="h-5 w-5 text-red-500"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p
                                            className="relative bottom-3 text-sm text-red-600"
                                            id="email-error"
                                        >
                                            No delivery to this Zip Code!
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 flex justify-between gap-x-6">
                                <p className=" text-sm leading-6 text-gray-600">
                                    Last Minute Bookings Call{" "}
                                    <a href="tel:6823762190">(682)376-2190</a>
                                </p>
                                <button
                                    type="submit"
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
