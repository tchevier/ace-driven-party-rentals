'use server'

export interface Category {
    id: string,
    name: string
}
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

    } catch (err) {
        errorMessage("Error! ❌");
        console.error(err);
    }
};
export const deleteCategory = async (categoryId: string) => {
    try {
        await deleteDoc(doc(db, "categories", categoryId));

    } catch (err) {
        console.error(err);
    }
};
