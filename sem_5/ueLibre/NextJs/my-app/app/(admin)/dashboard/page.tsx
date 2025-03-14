import Button from "@/app/component/Button";

export default function DashboardPage(){
    return(
        <div>
            <h1>Bienvenue sur Dashboard</h1>
            <p>Ceci est le tableau de bord de l'administrateur</p>
            <Button primary/>
            <Button secondary/>
        </div>
    );
}