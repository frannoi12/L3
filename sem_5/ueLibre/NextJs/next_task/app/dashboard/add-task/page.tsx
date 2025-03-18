"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import createTask from "../sevice/tacheService";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function AddTaskPage() {

    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [minDate, setMinDate] = useState<string>("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserId(JSON.parse(user).id)
        }

        const aujourdhui = new Date().toISOString().split("T")[0]
        setMinDate(aujourdhui)
    },[])

    const validerData = Yup.object({
        title : Yup.string().required("Le titre est requis"),
        description: Yup.string().required("La description est requise")
    })

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Ajouter une Tâche</h2>

            <Formik 
                initialValues={{title:"",description:"",dueDate:""}}
                validationSchema = {validerData}
                onSubmit = {
                    async (values, {setSubmitting,setErrors}) => {
                        if(!userId){
                            setErrors({title:"utilisateur non authentifié"})
                            setSubmitting(false)
                            return
                        }
                        const response = await createTask({...values,userId})

                        if(response.success){
                            router.push("/dashboard")
                        }else{
                            setErrors({title:response.message || "erreur inconnue"})
                        }
                        setSubmitting(false)
                    }
                }
            >
                {
                    ({isSubmitting}) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium">Titre</label>
                                <Field
                                    type="text"
                                    name="title"
                                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium">Description</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="description" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium">Date d'échéance</label>
                                <Field
                                    type="date"
                                    name="dueDate"
                                    min={minDate}
                                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                />
                                <ErrorMessage name="dueDate" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                                >
                                {isSubmitting ? "Ajout en cours..." : "Ajouter la Tâche"}
                            </button>
                        </Form>
                    )
                }
            </Formik>

        </div>
    );
}