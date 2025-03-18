"use client";

import { Home, List, BarChart2, LogOut } from "lucide-react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);


  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) {
    return null; 
  }


  return (
    <div className= {`${darkMode ? "dark" : ""} flex min-h-screen bg-gray-100 dark:bg-gray-900`}>      
      <SideBar/>    
      <main className="flex-1 p-6">
        <Header/>
        {children}
      </main>
    </div>
  );
}