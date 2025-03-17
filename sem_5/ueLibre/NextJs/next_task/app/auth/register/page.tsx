"use client";

import { useRouter } from "next/navigation";
import { registeruser } from "../authService/authService";

export default function RegisterPage() {
    const router = useRouter();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            await registeruser(formData);
            router.push("/auth/login");
        } catch (error) {
            console.error("error lors de l'inscription", error);
        }

    }

    return (
        <div>
            <h1>Inscription</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>

                <div>
                    <input type="submit" value="S'inscrire"/>
                </div>
            </form>

        </div>
    );
}