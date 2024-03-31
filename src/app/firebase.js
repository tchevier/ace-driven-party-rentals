import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage"; // Import getStorage for Firebase Storage
import 'firebase/auth'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// Access Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const handleFileUpload = async (files) => {
    if (files) {
        const fileList = Array.from(files);
        try {
            const uploadTasks = fileList.map(file => {
                // Get a reference to the location where you want to store the file
                const storageRef = ref(storage, `images/${file.name}`);
                return uploadBytes(storageRef, file); // Upload the file to storage
            });
            await Promise.all(uploadTasks);
            console.log('Files uploaded successfully');
        } catch (error) {
            console.error('Error uploading files:', error);
            // Handle error
        }
    }
};