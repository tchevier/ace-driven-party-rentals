"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Nav";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";


export default function Home() {
    const [user] = useAuthState(auth)
    const router = useRouter()
    
    console.log(user)
    return (
        <>
            {/* {user?.publicMetadata.role === "ADMIN" ? (
                <DashboardPage />
            ) : ( */}
                <>
                    <Navbar />
                    <HeroSection />
                </>
            {/* )} */}
        </>
    );
}
