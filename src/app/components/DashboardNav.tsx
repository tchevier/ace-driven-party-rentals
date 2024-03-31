'use client'
import { ChartBarIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import { ChartPieIcon, HomeIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    {
        name: "Sales",
        href: "/dashboard/sales",
        icon: ChartBarIcon,
        current: false,
    },
    {
        name: "Products",
        href: "/dashboard/products",
        icon: ShoppingCartIcon,
        current: false,
    },
    {
        name: "Categories",
        href: "/dashboard/categories",
        icon: ChartPieIcon,
        current: false,
    },
    
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function DashboardNav() {
    const [currentNavItem, setCurrentNavItem] = useState("Dashboard");
    const pathname = usePathname()
    return (
        <div className="flex w-48 flex-col h-[100dvh] overflow-y-auto">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-20 shrink-0 items-center">
                <Image
                    className=""
                    src="/logos/ace-logo.png"
                    width={150}
                    height={100}
                    alt="Your Company"
                />
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => {
                                const isCurrent = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={classNames(
                                                isCurrent
                                                    ? "bg-gray-800 text-white"
                                                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            )}
                                        >
                                            <item.icon
                                                className="h-6 w-6 shrink-0"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
                <div className="pb-5">
                </div>
            </nav>
        </div>
    </div>
    );
}
