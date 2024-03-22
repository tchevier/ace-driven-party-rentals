"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
const navigation = [{ href: "/inventory", name: "Inventory" }];
export default function Navbar() {
    const { user, isLoaded } = useUser();

    return (
        <Disclosure as="nav" className="bg-white z-10">
            {({ open }) => (
                <>
                    <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0">
                                    <Link href="/">
                                        <div className="flex items-center">
                                            <Image
                                                className=""
                                                width={120}
                                                height={200}
                                                src="/ace-logo.png"
                                                alt="Your Company"
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {isLoaded && user && (
                                        <>
                                            <Link
                                                href="/dashboard"
                                                className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                            >
                                                Dashboard
                                            </Link>
                                        </>
                                    )}
                                    {navigation.map((link) => {
                                        return (
                                            <Link
                                            key={link.name}
                                                href={link.href}
                                                className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                            >
                                               {link.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {(isLoaded && user && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Profile dropdown */}
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            )) || (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Profile dropdown */}
                                    <SignInButton>
                                        <button className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </div>
                            )}
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pb-4 pt-2">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            {isLoaded && user && (
                                        <>
                                            <Disclosure.Button
                                                as="a"
                                                href="/dashboard"
                                                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                                            >
                                                Dashboard
                                            </Disclosure.Button>
                                        </>
                                    )}
                            {navigation.map((link) => {
                                        return (
                                            <Disclosure.Button
                                            as="a"
                                            key={link.name}
                                                href={link.href}
                                                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                                            >
                                               {link.name}
                                            </Disclosure.Button>
                                        );
                                    })}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
