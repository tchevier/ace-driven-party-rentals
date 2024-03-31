import { useEffect, useState } from "react";
import SecondaryNav from "../../components/SecondaryNav";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { getProducts } from "../../api/products";

export default function Inventory() {
    return (
        <>
            <SecondaryNav />
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                hi
            </div>
        </>
    );
}
