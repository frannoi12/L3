"use client";

import { useState, useEffect } from "react";
import { Home, List, PlusCircle, LogOut } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
 

  

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Gestion Tâches</h1>
        <nav className="space-y-4">
          <NavItem icon={Home} label="Accueil" href="/" />
          <NavItem icon={List} label="Tâches" href="/dashboard" />
          <NavItem icon={PlusCircle} label="Ajouter une tâche" href="/dashboard/add-task" />
        </nav>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
          <LogOut size={20} /> Déconnexion
        </button>

        
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
  return (
    <Link href={href} className="block">
      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
        <Icon size={20} />
        
        {label}
      </div>
    </Link>
  );
}