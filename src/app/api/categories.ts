import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export interface Category {
    id: string,
    name: string
}
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
    console.error(message);
};

export const getCategories = async (setCategories: any) => {
    try {
        const unsub = onSnapshot(collection(db, "categories"), (doc) => {
            const docs: any = [];
            doc.forEach((d: any) => {
                docs.unshift({ ...d.data(), id: d.id });
            });
            setCategories(docs);
        });
    } catch (err) {
        console.error(err);
        setCategories([]);
    }
};
export const addCategory = async (category: Category) => {
    try {
        const { name } = category;
        await addDoc(collection(db, "categories"), {
            name,
        });
        successMessage(`Category added! 🎉`);
    } catch (err) {
        errorMessage("Error! ❌");
        console.error(err);
    }
};
export const deleteCategory = async (categoryId: string) => {
    try {
        await deleteDoc(doc(db, "categories", categoryId));

        successMessage(`Category deleted! 🎉`);
    } catch (err) {
        errorMessage("Error! ❌");
        console.error(err);
    }
};
