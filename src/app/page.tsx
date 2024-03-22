import HeroMenu from "./components/HeroMenu";
import bg from "../../public/bounceparty.jpg";
import Image from "next/image";
export default function Home() {
    // const { userId } = auth();

    // // if(userId) {
    // //   redirect('/dashboard')
    // // }
    return (
        <>
        {/* { background image} */}
            <div className="bg-img"></div>
            <HeroMenu />
        </>
    );
}
