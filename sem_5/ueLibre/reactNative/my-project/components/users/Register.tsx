import React from "react";
import { Formik, Field, Form,ErrorMessage } from "formik";
import * as Yup from 'yup';



const validated = Yup.object().shape({
    nom: Yup.string()
        .min(3,"trop petit")
        .max(10,"trop long")
        .required("Ce champ est obligatoire ."),
    
    prenom: Yup.string()
        .min(2,"trop petit")
        .max(15,"trop long")
        .required("Ce champ est obligatoire ."),
    
    email: Yup.string()
        .min(4,"trop petit")
        .max(15, "trop long")
        .required("Ce champ est obligatoire"),
    
    password: Yup.string()
        .min(4,"trop petit")
        .max(255, "trop long")
        .required("Ce champ est obligatoire"),
    
    sexe: Yup.string()
        .required("Ce champ est obligatoire, Veillez choisir le sexe !!")
})




const FormulaireRegister = ({navigation}) => {
    const initialValue = {
        nom:"",
        prenom:"",
        email:"",
        password:"",
        sexe:"",
        role:"admin",
    };

    const handleSubmit = async (values) => {
        try{
            const reponse = await fetch('http://192.168.62.154:8080/api/users',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            if(!reponse.ok){
                throw new Error("Une erreur est survenue lors de l'inscription")
                const data = await reponse.json()
                console.log("Compte crer :", data);
            }
            else{
                const data = await reponse.json()
                console.log("Compte crer :", data);
                navigation.navigate("login");
            }
    
            

            
        }
        catch(error){
            console.log(error);
        }
    };
    

    return (
        <div>
            <h1>Créer un compte :</h1>
            <Formik 
                initialValues={initialValue}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ resetForm }) => (
                    <Form>
                        <div>
                            <label htmlFor="nom">Nom</label>
                            <Field
                                type = "text"
                                name = "nom"
                                id = "nom"
                            />
                            <ErrorMessage name="nom"></ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="prenom">Prenom</label>
                            <Field
                                type = "text"
                                name = "prenom"
                                id = "prenom"
                            />
                            <ErrorMessage name="prenom"></ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field
                                type = "email"
                                name = "email"
                                id = "email"
                            />
                            <ErrorMessage name="email"></ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                type = "password"
                                name = "password"
                                id = "password"
                            />
                            <ErrorMessage name="password"></ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="sexe">Sexe</label>
                            <div id="sexe">
                                <label htmlFor="">
                                    <Field
                                        type = "radio"
                                        name = "sexe"
                                        value = "masculin"
                                    ></Field>
                                    Masculin
                                </label>
                            </div>
                            <div>
                                <label htmlFor="">
                                    <Field
                                        type = "radio"
                                        name = "sexe"
                                        value = "feminin"
                                    ></Field>
                                    Féminin
                                </label>
                                <ErrorMessage name="sexe"></ErrorMessage>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="role">Role</label>
                            <Field
                                type = "text"
                                name = "role"
                                id = "role"
                            />
                        </div>
                        <div>
                            <button 
                                type="submit"
                            >
                                S'inscrire
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                            >
                                Annuler
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormulaireRegister;