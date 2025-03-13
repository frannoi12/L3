import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.css";
import { AuthContext } from '../auth/AuthProvieders';


const validationSchema = Yup.object().shape({
  titre: Yup.string()
    .min(2, "trop petit")
    .max(255, "trop long!")
    .required("Ce champ est obligatoire"),
  description: Yup.string()
    .min(2, "trop petit")
    .max(255, "trop long!")
    .required("Ce champ est obligatoire"),
  prix: Yup.number()
    .min(0, "le prix doit etre positif")
    .required("le prix est obligatoire"),
  credit: Yup.number()
    .min(0, "le credit doit etre positif")
    .required("le credit est obligatoire"),
});

const initialValues = {
  titre: "",
  description: "",
  prix: "",
  credit: "",
};

const Formulaire = ({navigation}) => {
  const { user } = useContext(AuthContext); // Utilisez le contexte Auth
  if (!user) {
    alert("l'utilisateur n'est pas connecté");
    return null;
  }

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://192.168.62.154:8080/api/cours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Utilisez le token de l'utilisateur
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'enregistrement des données.');
      }

      const data = await response.json();
      console.log('Données enregistrées:', data);
      navigation.navigate('cours'); // Assurez-vous que navigation est bien passé en prop
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 pt-3">
          <h1 className="text-center">Enregistrer un cours</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="titre">Titre : </label>
                  <Field
                    type="text"
                    id="titre"
                    name="titre"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="titre"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Description : </label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="prix">Prix : </label>
                  <Field
                    type="number"
                    id="prix"
                    name="prix"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="prix"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="credit"> Credit : </label>
                  <Field
                    type="number"
                    id="credit"
                    name="credit"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="credit"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group d-flex justify-content-end gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-danger"
                  >
                    Annuler
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Formulaire;