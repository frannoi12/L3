import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        contacts: [Contact!]! # Relation entre User et Contact
    }
  
    type Contact {
        id: Int!
        phone: String!
        address: String!
        user: User! # Relation entre Contact et User
    }
    
    type Query {
        users: [User!]! # Liste de tous les utilisateurs
        user(id: Int!): User # Détails d'un utilisateur spécifique
        contacts: [Contact!]! # Liste de tous les contacts
        contact(id: Int!): Contact # Détails d'un contact spécifique
        hello: String
    }
    
    type Mutation {
        createUser(name: String!, email: String!): User! # Créer un utilisateur
        createContact(phone: String!, address: String!, userId: Int!): Contact! # Créer un contact
        updateUser(id: Int!, name: String, email: String): User # Mettre à jour un utilisateur
        updateContact(id: Int!, phone: String, address: String): Contact # Mettre à jour un contact
        deleteUser(id: Int!): Boolean # Supprimer un utilisateur
        deleteContact(id: Int!): Boolean # Supprimer un contact
    }  
`;

export default typeDefs;
