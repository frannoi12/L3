import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      contacts {
        id
        name
        phone
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
      contacts {
        id
        name
        phone
        address
      }
    }
  }
`;

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
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

export const GET_CONTACT = gql`
  query GetContact($id: Int!) {
    contact(id: $id) {
      id
      name
      phone
      address
      user {
        id
        name
        email
      }
    }
  }
`;