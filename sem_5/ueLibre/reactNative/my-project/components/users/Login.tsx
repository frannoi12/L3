import React from "react";
import { Formik, Field, Form,ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Text, View, TextInput, Button } from "react-native";



const validated = Yup.object().shape({  
    email: Yup.string()
        .min(4,"trop petit")
        .max(15, "trop long")
        .required("Ce champ est obligatoire"),
    
    password: Yup.string()
        .min(4,"trop petit")
        .max(255, "trop long")
        .required("Ce champ est obligatoire"),
})




const FormulaireLogin = ({navigation}) => {
    const initialValue = {
        email:"",
        password:"",
    };

    const handleSubmit = async (values) => {
        console.log("vfffgvhfdtfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        
        try{
            const reponse = await fetch('http://192.168.62.154:8080/api/login',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            console.log(reponse);
            
            if(!reponse.ok){
                throw new Error("Une erreur est survenue lors de la connexion")
            }else{
                const data = await reponse.json()
                console.log("Connexion réussi : ", data);
                // navigation.navigate("login");
            }
            
        }catch(error){
            console.log(error);
        }
    };

    
    

    return (
       <div>
            <h1>Se Connecter :</h1>
            <Formik 
                initialValues={initialValue}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
            {({ resetForm }) => (
                <Form>
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
                        <button 
                            type="submit"
                        >
                            Se Connecter
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

export default FormulaireLogin;