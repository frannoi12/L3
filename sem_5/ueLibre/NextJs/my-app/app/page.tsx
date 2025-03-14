"use client";
import Styles  from "./component/Button.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default  function Home(){
    // throw new Error("Erreur");
    const router = useRouter();
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 5000)
    // });
    return(
        <div>
            <nav className="flex space-x-4 justify-center">
                <Link href="/about" className="text-blue-700 underline">A propos</Link>
                <Link href="/dashboard" className="text-blue-700 underline">Dashboard</Link>
                <p className={Styles.text}>Autre classe</p>
                {/* <button onClick={() => {router.push("/dashboard");}} className="text-blue-700 bg-gray-700 rounded-2xl">Vers dashboard</button> */}
                <button onClick={() => {router.push("/dashboard");}} className={Styles.button}>Vers dashboard</button>
            </nav>
        </div>
    );
}