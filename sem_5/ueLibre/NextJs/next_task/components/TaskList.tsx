"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTask, getTasks, updateTask } from "@/app/dashboard/sevice/tacheService";

export default function TaskList() {
    const [taches, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        setLoading(true);
        const response = await getTasks();

        if (response.success) {
            setTasks(response.data);
        } else {
            setError("Erreur lors du chargement des tâches.");
        }
        setLoading(false);
    }

    async function handleDelete(taskId: string) {
        if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            const response = await deleteTask(taskId);
            if (response.success) {
                setTasks(taches.filter((task) => task.id !== Number(taskId))); // Mise à jour locale
            } else {
                alert("Erreur lors de la suppression !");
            }
        }
    }

    async function toggleComplete(taskId: number, completed: boolean) {
        const task = taches.find((t) => t.id === taskId);
        if (!task) return;

        const updatedTask = { ...task, completed: !completed };

        const response = await updateTask(taskId, updatedTask);
        if (response.success) {
            setTasks(taches.map((t) => (t.id === taskId ? updatedTask : t))); // Mise à jour locale
        } else {
            alert("Erreur lors de la mise à jour !");
        }
    }

    if (loading) return <p>Chargement des tâches...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Liste des tâches</h1>

            {taches.length === 0 ? (
                <p>Aucune tâche trouvée.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border p-2">Titre</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Échéance</th>
                            <th className="border p-2">Complétée</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taches.map((task) => (
                            <tr key={task.id} className="border">
                                <td className="border p-2">{task.title}</td>
                                <td className="border p-2">{task.description}</td>
                                <td className="border p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                                <td className="border p-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id, task.completed)}
                                        className="cursor-pointer"
                                    />
                                </td>
                                <td className="border p-2 flex gap-2">
                                    <button 
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        onClick={() => router.push(`/dashboard/update/${task.id}`)}
                                    >
                                        Modifier
                                    </button>
                                    <button 
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
