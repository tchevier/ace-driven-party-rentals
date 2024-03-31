import {
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import { RentalTime} from "../components/HeroSection";
import { toast } from "react-toastify";
export interface Product {
    id: string;
    category: string;
    description: string;
    dimensions: string;
    images: File[];
    name: string;
    price: number;
    quantity: number;
}

export type RentalFormData = {
    rentalDate: Date;
    dropOffTime: RentalTime;
    rentalDuration: RentalTime;
    zipCode: string;
};

export const successMessage = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
export const errorMessage = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
export async function getProductsBySearch(formData: RentalFormData) {
    const q = query(
        collection(db, "Products"),
        where("rentedDates", "!=", formData.rentalDate)
    );
    const productsArr: any = []; // Initialize products array

    // Attach a listener for document snapshots
    const cleanUp = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            productsArr.push({
                id: doc.id,
                name: data.name,
                description: data.description,
                dimensions: data.dimensions,
                images: data.images,
                price: data.price,
                quantity: data.quantity,
                rentalDates: data.rentedDates,
            });
        });
    });

    return productsArr;
}
export const getProducts = async (setProducts: any) => {
    try {
        const unsub = onSnapshot(collection(db, "products"), (doc) => {
            const docs: any = [];
            doc.forEach((d: any) => {
                docs.unshift({ ...d.data(), id: d.id });
            });
            setProducts(docs);
        });
    } catch (err) {
        console.error(err);
        setProducts([]);
    }
};
export const addProduct = async (product: Product) => {
    try {
        const {
            name,
            price,
            description,
            images,
            dimensions,
            category,
            quantity,
        } = product;
        await addDoc(collection(db, "products"), {
            name,
            price,
            description,
            images,
            dimensions,
            category,
            quantity,
        });
        successMessage(`${name} product added! 🎉`);
    } catch (err) {
        
        errorMessage("Error! ❌");
        console.error(err);
    }
};
export const deleteProduct = async (productId: string) => {
    try {
        await deleteDoc(doc(db, "products", productId));

        successMessage(`Product deleted! 🎉`);
    } catch (err) {
        errorMessage("Error! ❌");
        console.error(err);
    }
};
