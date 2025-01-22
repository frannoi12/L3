const { ApolloServer } = require('apollo-server');
const { print } = require('graphql');

// Définition du schéma
const typeDefs = `
  type User {
    id: Int
    name: String
  }

  type Query {
    user(id: Int!): User
  }
`;

// Données mock pour l'exemple
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// Résolveurs
const resolvers = {
  Query: {
    user: (_, { id }) => users.find(user => user.id === id),
  },
};

// Création du serveur
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Serveur prêt à l'adresse ${url}`);
});

// Exemple de requête sous forme d'objet
const query = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",  // Correction ici
                name: { kind: "Name", value: "id" },
                value: { kind: "IntValue", value: "1" }
              }
            ]
          }
        ]
      }
    }
  ]
};

// Convertir l'objet de requête en chaîne GraphQL
const queryString = print(query);
console.log('Requête GraphQL :', queryString);