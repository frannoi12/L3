import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <NavBar/>

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mt-8">Bienvenue sur Next Task</h1>
        <p className="text-center mt-4">Une application de gestion de tâches simple et efficace</p>
      </div>
    </div>
  );
}
