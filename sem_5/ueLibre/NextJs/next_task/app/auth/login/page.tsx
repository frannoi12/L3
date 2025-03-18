"use client"
import { useRouter } from "next/navigation";
import { loginUser } from "../authService/authService";

export default function LoginPage() {

    const router = useRouter();

    const traitementSoumis = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const formData = new FormData(event.currentTarget);
            const response =  await loginUser(formData);
            console.log(response);
            
            if(response?.user){
                localStorage.setItem("user", JSON.stringify(response.user));
                router.push("/dashboard");
            }
            
        } catch (error) {
            console.error("error lors de la connexion");
        }
    }

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={traitementSoumis}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <input type="submit" value="Se connecter" />
                </div>
            </form>
        </div>
    );
}