"use client";

import {use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getTaskById, updateTask } from "../../sevice/tacheService";

export default function EditTaskPage({ params }: { params: Promise<{ id: string }>  }) {
  const router = useRouter();
  const {id} = use(params);
  const tacheId = Number(id)
  const [tache, setTask] = useState<any>(null);
  const [chargement, setChargement] = useState(true);
  const [minDate, setMinDate] = useState<string>("");


  useEffect(() => {
    async function fetchTask() {
      const data = await getTaskById(tacheId);
      if (!data) {
        router.push("/not-found");
      } else {
        setTask(data);
      }
      setChargement(false);
    }

    fetchTask();
    setMinDate(new Date().toISOString().split("T")[0]);
  }, [tacheId, router]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Le titre est requis."),
    description: Yup.string().required("La description est requise."),
    dueDate: Yup.date()
      .min(new Date().toISOString().split("T")[0], "La date doit être à partir d'aujourd'hui.")
      .required("La date est requise."),
  });

  if (chargement) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Modifier une Tâche</h2>

      <Formik
        initialValues={{
          title: tache.title || "",
          description: tache.description || "",
          dueDate: tache.dueDate ? new Date(tache.dueDate).toISOString().split("T")[0] : "",
          completed: tache.completed || false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const response = await updateTask(tacheId, values);

          if (response.success) {
            router.push("/dashboard");
          } else {
            setErrors({ title: response.message || "Erreur lors de la mise à jour." });
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
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

            <div className="flex items-center gap-3">
              <label className="text-gray-700 dark:text-gray-300 font-medium">Tâche terminée :</label>
              <Field type="checkbox" name="completed" className="w-5 h-5" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Mise à jour..." : "Mettre à jour la Tâche"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}