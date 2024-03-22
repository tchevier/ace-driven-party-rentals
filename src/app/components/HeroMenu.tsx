"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Datepicker } from "flowbite-react";
interface RentalType {
    id: number;
    display: string;
}
interface RentalTime {
    value: number;
    display: string;
}
const rentalTypes: RentalType[] = [
    { id: 1, display: "Bounce Houses" },
    { id: 2, display: "Combos" },
    { id: 3, display: "Equipment" },
    { id: 4, display: "Tents" },
];

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
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrowsDate = new Date(currentDate);

    const [selectedRentalType, setSelectedRentalType] = useState<RentalType>(
        rentalTypes[0]
    );
    const [selectedRentalDuration, setSelectedRentalDuration] =
        useState<RentalTime>(rentalDurations[0]);
    const [dropOffTime, setDropOffTime] = useState("8:00 AM");
    const [zipCode, setZipCode] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSearch = () => {
        // Perform search or any other action with the form data
        console.log("Selected Rental Type:", selectedRentalType);
        console.log("Selected Rental Date:", selectedDate);
        console.log("Drop Off Time:", dropOffTime);
        console.log("Rental Duration", selectedRentalDuration);
        console.log("Zip Code:", zipCode);
    };

    return (
        <div className="absolute left-1/2 lg:left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5  shadow-lg z-10 max-w-md w-5/6 rounded opacity-90">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Book your next party rentals.
            </h1>
            <div className="mt-10 flex justify-between">
                <div className="w-5/12">
                    <Listbox
                        value={selectedRentalType}
                        onChange={setSelectedRentalType}
                    >
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                    RENTAL TYPE
                                </Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="w-full relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">
                                            {selectedRentalType.display}
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
                                            {rentalTypes.map((type) => (
                                                <Listbox.Option
                                                    key={type.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active
                                                                ? "bg-green-600 text-white"
                                                                : "text-gray-900",
                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                        )
                                                    }
                                                    value={type}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={classNames(
                                                                    selected
                                                                        ? "font-semibold"
                                                                        : "font-normal",
                                                                    "block truncate"
                                                                )}
                                                            >
                                                                {type.display}
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
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
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
                        <Datepicker showTodayButton={false}
                            minDate={tomorrowsDate}
                            onSelectedDateChanged={(date: Date) =>
                                setSelectedDate(date)
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <div className="w-5/12">
                    <Listbox value={dropOffTime} onChange={setDropOffTime}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                    DROP OFF TIME
                                </Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="w-full relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">
                                            {dropOffTime}
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
                                            {dropOffTimes.map((time, id) => (
                                                <Listbox.Option
                                                    key={id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active
                                                                ? "bg-green-600 text-white"
                                                                : "text-gray-900",
                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                        )
                                                    }
                                                    value={time.display}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={classNames(
                                                                    selected
                                                                        ? "font-semibold"
                                                                        : "font-normal",
                                                                    "block truncate"
                                                                )}
                                                            >
                                                                {time.display}
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
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
                <div className="w-5/12">
                    <Listbox
                        value={selectedRentalDuration}
                        onChange={setSelectedRentalDuration}
                    >
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                    RENTAL DURATION
                                </Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="w-full relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">
                                            {selectedRentalDuration.display}
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
                                            {rentalDurations.map((time, id) => (
                                                <Listbox.Option
                                                    key={id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active
                                                                ? "bg-green-600 text-white"
                                                                : "text-gray-900",
                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                        )
                                                    }
                                                    value={time}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={classNames(
                                                                    selected
                                                                        ? "font-semibold"
                                                                        : "font-normal",
                                                                    "block truncate"
                                                                )}
                                                            >
                                                                {time.display}
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
                                            ))}
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
                    <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        EVENT ZIP CODE
                    </label>
                    <div className="mt-2 ">
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="
                                block w-full rounded-md border-0 py-1.5 ps-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Enter Zip Code"
                        />
                    </div>
                </div>
                
            </div>
           

            <div className="mt-4 flex justify-between gap-x-6">
            <p className="mt-4 text-sm leading-6 text-gray-600">
               Last Minute Bookings Call{" "}
                <a href="tel:6823762190">(682)376-2190</a>
            </p>
                <button
                    type="button"
                    onClick={handleSearch}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
