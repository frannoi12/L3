import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../auth/AuthProvieders";



const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email invalide")
        .min(4, "Trop petit")
        .max(50, "Trop long")
        .required("Ce champ est obligatoire"),
    password: Yup.string()
        .min(4, "Trop petit")
        .max(255, "Trop long")
        .required("Ce champ est obligatoire"),
});

const FormulaireLogin = ({ navigation }) => {
    const initialValues = {
        email: "",
        password: "",
    };

    const { user,setUser } = React.useContext(AuthContext);

    const handleSubmit = async (values) => {
        try {
            const response = await fetch("http://192.168.62.154:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Une erreur est survenue lors de la connexion");
            }

            console.log("Connexion réussie :", data);
            setUser(data);
            console.log("User:", user);
            // navigation.navigate("cours"); // Assure-toi que navigation est bien passé en prop
            
            if(user){
                navigation.navigate("cours"); // Assure-toi que navigation est bien passé en prop
            }
        } catch (error) {
            console.error("Erreur:", error.message);
        }
    };
    useEffect(()=>{
        console.log("User:", user);
    }
    ,[user]);

    return (
        <div>
            <h1>Se Connecter :</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ resetForm }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" id="email" />
                            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <Field type="password" name="password" id="password" />
                            <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                        </div>
                        <div>
                            <button type="submit">Se Connecter</button>
                            <button type="button" onClick={resetForm}>
                                Annuler
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormulaireLogin;
