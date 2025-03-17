import { Icon, IconNode } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-5">
      <h1 className="text-2xl font-bold text-gray-800">Gestion Tâche</h1>
      <nav className="space-y-4">
        
      </nav>
      <NavItem label="Ajouter" href="/dashboard/add-task" /> 
      <NavItem label="Liste des taches" href="/dashboard" />
      <button className="mt-10 flex items-center gap-2 text-red-500">

      </button>

      
    </aside>
  );
}


function NavItem({label,href}:{label:string,href:string}){
    return(
        <Link href={href}>
            <div className="flex items-center gap-3 text-gray-700 hover:bg-blue-700">
                {label}
            </div>
        </Link>
    );
}