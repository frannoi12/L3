const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Schéma GraphQL
const schema = buildSchema(`
  type Query {
    hello: String
    users: [User]
  }

  type User {
    id: ID
    name: String
    email: String
  }
`);

// Données fictives
const usersData = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Résolveurs
const root = {
  hello: () => 'Hello world!',
  users: () => usersData,
};

// Initialiser l'application Express
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Activer GraphiQL pour tester les requêtes
}));

// Démarrer le serveur
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serveur GraphQL en cours d'exécution sur http://localhost:${PORT}/graphql`);
});