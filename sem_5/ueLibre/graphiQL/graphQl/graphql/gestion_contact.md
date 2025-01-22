

Parfait ! Nous allons créer un projet GraphQL avec Express et Prisma pour gérer les utilisateurs et leurs contacts. Voici un plan de ce que nous allons faire :

### 1. **Configuration du projet**

- Créer un nouveau projet Node.js.
- Installer les dépendances nécessaires : `express`, `graphql`, `apollo-server-express`, et `prisma`.

### 2. **Configuration de Prisma**

- Créer le modèle de données dans Prisma pour `User` et `Contact`.
- Configurer la base de données et les relations entre `User` et `Contact`.

### 3. **Création du schéma GraphQL**

- Définir le schéma GraphQL pour les opérations CRUD sur les utilisateurs et contacts.

### 4. **Création des résolveurs GraphQL**

- Créer les résolveurs pour récupérer et gérer les utilisateurs et les contacts.

### 5. **Intégration avec Express et Apollo Server**

- Configurer Apollo Server avec Express et intégrer Prisma pour l'accès à la base de données.

---

### Étape 1 : Configuration du projet

Dans un terminal, crée un nouveau dossier pour le projet et initialises-le avec npm :

```bash
mkdir graphql-gestion-contacts
cd graphql-gestion-contacts
npm init -y
```

Installe les dépendances nécessaires :

```bash
npm install express apollo-server-express graphql prisma @prisma/client
```

---

### Étape 2 : Configuration de Prisma

Initialise Prisma dans ton projet :

```bash
npx prisma init
```

Dans le fichier `prisma/schema.prisma`, configure les modèles `User` et `Contact`. Voici un exemple de modèle simple :

```prisma
datasource db {
  provider = "postgresql"  // ou "mysql" selon ta base de données
  url      = env("DATABASE_URL")  // Assure-toi de configurer la variable d'environnement DATABASE_URL dans ton .env
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  contacts  Contact[] @relation("UserContacts")
}

model Contact {
  id        Int      @id @default(autoincrement())
  phone     String
  address   String
  users     User[]   @relation("UserContacts")
}
```

Après avoir configuré ton schéma Prisma, exécute la migration pour appliquer les changements à ta base de données :

```bash
npx prisma migrate dev --name init
```

Cela crée les tables `User` et `Contact` dans ta base de données.

---

### Étape 3 : Création du schéma GraphQL

Dans un fichier `src/schema.js`, définis les types GraphQL pour `User` et `Contact` ainsi que les requêtes et mutations pour gérer ces entités :

```javascript
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String
    contacts: [Contact]
  }

  type Contact {
    id: Int
    phone: String
    address: String
    users: [User]
  }

  type Query {
    users: [User]
    contacts: [Contact]
    user(id: Int!): User
    contact(id: Int!): Contact
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createContact(phone: String!, address: String!): Contact
    addContactToUser(userId: Int!, contactId: Int!): User
  }
`;

export default typeDefs;
```

---

### Étape 4 : Création des résolveurs GraphQL

Crée les résolveurs dans un fichier `src/resolvers.js` pour implémenter les opérations définies dans le schéma :

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    contacts: () => prisma.contact.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } }),
    contact: (_, { id }) => prisma.contact.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      return prisma.user.create({
        data: {
          name,
          email,
        },
      });
    },
    createContact: (_, { phone, address }) => {
      return prisma.contact.create({
        data: {
          phone,
          address,
        },
      });
    },
    addContactToUser: (_, { userId, contactId }) => {
      return prisma.user.update({
        where: { id: userId },
        data: {
          contacts: {
            connect: { id: contactId },
          },
        },
      });
    },
  },
};

export default resolvers;
```

---

### Étape 5 : Intégration avec Express et Apollo Server

Maintenant, dans `src/index.js`, configure le serveur Express et Apollo Server pour démarrer l'application :

```javascript
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
```

---

### Étape finale : Lancer le projet

Tu peux maintenant démarrer ton serveur avec :

```bash
node src/index.js
```

Ensuite, tu pourras accéder à ton API GraphQL via `http://localhost:4000/graphql` pour tester tes requêtes et mutations.

---

### Conclusion

Tu as maintenant une application GraphQL fonctionnelle avec Express et Prisma qui permet de gérer des utilisateurs et leurs contacts. Si tu veux ajouter des fonctionnalités comme l'authentification ou d'autres relations complexes, tu peux facilement étendre cette structure.

N'hésite pas à poser des questions si tu as des soucis ou si tu veux ajouter des fonctionnalités supplémentaires ! 😊