import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({children}:{children:React.ReactNode}){
    return(
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <main className="p-5">
                    {children}
            </main>
        </div>
    );
}