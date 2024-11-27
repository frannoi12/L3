import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Définition du schéma GraphQL
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      return await prisma.user.create({
        data: { name, email },
      });
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use('/graphql', createHandler({
  schema,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serveur GraphQL en cours d'exécution sur http://localhost:${PORT}/graphql`);
});