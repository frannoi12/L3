import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    hello: String
    calcul(a: Int!, b: Int!): Int
    statues: Boolean
    user: User
    items: [Item]
  }

  type User {
    id: ID!
    name: String!
    age: Int
    email: String
    isActive: Boolean
  }

  type Item {
    id: ID!
    title: String!
    price: Float!
    inStock: Boolean!
  }

`;

export default typeDefs;
