import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">TaskManager</h1>
        <div className="flex space-x-6">
            <Link href="" className="hover:bg-blue-700 px-4 py-2 rounded-lg">Acceuil</Link>
            <Link href="" className="hover:bg-blue-700 px-4 py-2 rounded-lg">A propos</Link>
            <Link href="/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded-lg">Tableau de bord</Link>
            <Link href="" className="hover:bg-blue-700 px-4 py-2 rounded-lg">Inscription</Link>
            <Link href="" className="hover:bg-blue-700 px-4 py-2 rounded-lg">Connexion</Link>
        </div>
      </div>
    </nav>
  );
}