"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import NavbarForm from "./NavbarForm";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
const navigation = [{ href: "/checkout", name: "Check Out" }, { href: "/about", name: "About" }, { href: "/Contact", name: "Contact" }];
export default function Navbar() {
    const [isLoading, setIsLoading] = useState(true);
    const [user] = useAuthState(auth);
    useEffect(() => {
        setIsLoading(false);
    }, [user]);
    return (
        <div
            // className="bg-green-600 sm:bg-gradient-to-r sm:from-green-800 sm:via-green-500 sm:to-blue-800 focus:outline-none focus:ring-green-300 shadow-lg px-5 py-2.5 text-center z-10"
            className="border-b pb-5"
        >
            <Disclosure as="nav">
                {({ open }: any) => (
                    <>
                        <div className="w-full px-2 sm:px-6 lg:px-8 ">
                            <div className="relative flex h-16 justify-between ">
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
                                <div className="flex items-center justify-center sm:items-stretch sm:justify-start ">
                                    <div className="flex-shrink-0">
                                        <Link href="/">
                                            <div className="flex items-center">
                                                <Image
                                                    className="transformLogo"
                                                    width={140}
                                                    height={200}
                                                    src="/logos/ace-logo.png"
                                                    alt="ACE DRIVEN PARTY RENTALS"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden sm:flex gap-4">
                                    {navigation.map((link) => {
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="flex justify-center items-center px-1 pt-1 text-md font-semibold "
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                                {!user && !isLoading && (
                                    <div className="hidden inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                                        <Link
                                            href={"/sign-in"}
                                            className="rounded-md px-3.5 py-2.5 mt-2 text-sm font-semibold   ring-inset hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={"/sign-up"}
                                            className="rounded-md px-3.5 py-2.5 mt-2 text-sm font-semibold  ring-inset hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                                {user && (
                                    <button
                                        className="rounded-md px-3.5  mt-2 text-sm font-semibold ring-inset hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                        onClick={() => auth.signOut()}
                                    >
                                        Sign Out
                                    </button>
                                )}
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 pb-4 pt-2">
                                {navigation.map((link) => {
                                    return (
                                        <Disclosure.Button
                                            as="a"
                                            key={link.name}
                                            href={link.href}
                                            className="flex items-center px-1 pt-1 text-md font-medium mt-1"
                                        >
                                            {link.name}
                                        </Disclosure.Button>
                                    );
                                })}
                                {user && (
                                    <Disclosure.Button
                                        className="flex items-center px-1 pt-1 text-md font-medium mt-1"
                                        onClick={() => auth.signOut()}
                                    >
                                        Sign Out
                                    </Disclosure.Button>
                                )}
                                {!user && !isLoading && (
                                    <>
                                        <Disclosure.Button
                                            as="a"
                                            className="flex items-center px-1 pt-1 text-md font-medium mt-1"
                                            href={"/sign-in"}
                                        >
                                            Sign In
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as="a"
                                            className="flex items-center px-1 pt-1 text-md font-medium mt-1"
                                            href={"/sign-up"}
                                        >
                                            Sign Up
                                        </Disclosure.Button>
                                    </>
                                )}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <NavbarForm />
        </div>
    );
}
