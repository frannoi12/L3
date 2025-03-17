interface User {
    id: number,
    name: string
}


export default async function SSRPage() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",{
        cache : "no-store"
    });
    
    const users: User[] = await response.json();
    return (
        <div className="flex space-x-4 text-align-center">
            <h1>Liste des Utilisateurs</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}