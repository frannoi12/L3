import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($name: String!, $phone: String!, $address: String!, $userId: Int!) {
    createContact(name: $name, phone: $phone, address: $address, userId: $userId) {
      id
      name
      phone
      address
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
      updatedAt
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: Int!, $phone: String, $address: String) {
    updateContact(id: $id, phone: $phone, address: $address) {
      id
      phone
      address
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    deleteContact(id: $id)
  }
`;