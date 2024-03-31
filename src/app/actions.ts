'use server'

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase";


export const doSignOut = () => {
    return auth.signOut()
}