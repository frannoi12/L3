"use client";
import { redirect } from "next/navigation";

export default function UsersPage(){

    // redirect("/dashboard");

    return(
        <div>
            <h1>Les utilisateurs</h1>
            <p>Ceci est la page des utilisateurs</p>
            <button
                onClick={() => {
                    redirect("/dashboard");
                }}
            >Dashboard</button>
        </div>
    );
}