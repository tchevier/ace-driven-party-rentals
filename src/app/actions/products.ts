"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export interface Product {
  id: string;
  category: string;
  description: string;
  dimensions: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  rentedDates: string[];
}

export async function getProductsByFilter(date: string) {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);

    const productsArr: any[] = [];
    const parsedDate = new Date(date);
    const newDate = parsedDate.toISOString().split("T")[0];
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      // Check if rentedDates array does not contain the specified date
      if (!productData.rentedDates.includes(newDate)) {
        productsArr.push({ id: doc.id, ...productData });
      }
    });

    return productsArr;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
export const getProductById = async (productId: string) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDocRef);

    if (productSnapshot.exists()) {
      const product = productSnapshot.data();
      return { product: product as Product, error: null };
    } else {
      throw new Error("No product found with ID: " + productId);
    }
  } catch (err) {
    return { product: null, error: "Failed to fetch product." };
  }
};
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const products = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
    return products;
  } catch (err) {
    console.log(err);
  }
};
// const [products, setProducts] = useState<Product[]>([]);
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + 1);
//     const tomorrowsDate = new Date(currentDate);
//     const [formData, setFormData] = useState({
//         rentalDate: tomorrowsDate.toDateString(),
//         dropOffTime: dropOffTimes[0],
//         rentalDuration: rentalDurations[0],
//         zipCode: "",
//     });
export async function addProduct(formData: FormData) {
  try {
    const imagesData: File[] = [];
    const imageLocations: string[] = [];

    // Extract image files from FormData
    formData.forEach((value, key) => {
      if (key.startsWith("image") && value instanceof File) {
        imagesData.push(value);
      }
    });

    // Upload images concurrently using Promise.all()
    const uploadTasks = imagesData.map(async (image) => {
      const storageRef = ref(storage, `${formData.get("name")}/${image.name}`);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    });

    // Wait for all uploads to complete
    const urls = await Promise.all(uploadTasks);

    // Store image URLs in imageLocations array
    imageLocations.push(...urls);

    // Add product document to Firestore
    await addDoc(collection(db, "products"), {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      images: imageLocations,
      dimensions: formData.get("dimensions"),
      category: formData.get("category"),
      quantity: Number(formData.get("quantity")),
      rentedDates: [],
    });
    redirect("/dashboard/products");
  } catch (err) {
    return {
      message: "Failed to create product.",
    };
  }
}
export async function deleteProduct(formData: FormData) {
  try {
    await deleteDoc(doc(db, "products", formData.get("id") as string));
    revalidatePath("/dashboard/products");
    return {
      message: "Product deleted successfully.",
    };
  } catch (err) {
    return {
      message: "Failed to delete product.",
    };
  }
}
