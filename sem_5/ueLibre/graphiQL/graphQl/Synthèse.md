
### **Introduction**

GraphQL est un langage de requête et un runtime développé par Facebook en 2015 pour résoudre les limitations des APIs REST. Il permet aux clients de demander exactement les données dont ils ont besoin et rien de plus.

#### Objectifs principaux :

- Offrir une flexibilité dans la récupération des données.
- Réduire les appels multiples grâce à des requêtes consolidées.
- Faciliter l'évolution des APIs sans casser les intégrations existantes.

#### Comparaison avec REST :

|Aspect|REST|GraphQL|
|---|---|---|
|Structure des données|Multiples endpoints par ressource|Un seul endpoint flexible|
|Récupération des données|Risque de surcharge/sous-charge|Données spécifiques demandées|
|Évolution de l’API|Complexité croissante|Introduction facile de nouveaux types|

_(Sources : [graphql.org](https://graphql.org/learn/), [spec.graphql.org](https://spec.graphql.org))_

---

### **Les concepts fondamentaux**

#### **1. Schéma et système de types**

- Le **schéma** est la base de GraphQL. Il définit :
    - Les **types** (objets, scalaires, interfaces, unions).
    - Les relations entre ces types.
    - Les opérations disponibles (queries, mutations, subscriptions).

**Exemple d’un schéma simple :**

```graphql
type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String
  email: String
}
```

**Scalaires natifs :**

- `Int`, `Float`, `String`, `Boolean`, `ID`.

_(Source : [graphql.org/learn/schema](https://graphql.org/learn/schema/))_

---

#### **2. Requêtes GraphQL**

GraphQL permet aux clients de spécifier leurs besoins en données via des requêtes précises.

**Exemple de requête :**

```graphql
query GetUser {
  user(id: "1") {
    name
    email
  }
}
```

**Réponse JSON :**

```json
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
```

---

#### **3. Mutations**

Les mutations permettent de modifier des données, comme créer, mettre à jour ou supprimer des éléments.

**Exemple de mutation :**

```graphql
mutation CreateUser {
  createUser(input: { name: "Bob", email: "bob@example.com" }) {
    id
    name
  }
}
```

**Réponse JSON :**

```json
{
  "data": {
    "createUser": {
      "id": "2",
      "name": "Bob"
    }
  }
}
```

---

#### **4. Subscriptions**

Les subscriptions permettent aux clients de recevoir des mises à jour en temps réel.

**Exemple :**

```graphql
subscription OnUserAdded {
  userAdded {
    id
    name
  }
}
```

_(Source : [graphql.org](https://graphql.org/learn/queries/))_

---

#### **5. Fragments et réutilisation**

Les fragments permettent de réutiliser des parties de requêtes pour simplifier le code.

**Exemple :**

```graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...UserFields
  }
}
```

---

### **Fonctionnalités avancées**

#### **1. Introspection**

GraphQL permet d'interroger un serveur sur ses capacités (types et champs disponibles).

**Exemple d’introspection :**

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

_(Source : [graphql.org/introspection](https://graphql.org/learn/introspection/))_

---

#### **2. Directives**

GraphQL inclut des directives pour conditionner les requêtes.

**Exemple avec `@include` et `@skip` :**

```graphql
query getUser($includeEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $includeEmail)
  }
}
```

---

### **Exécution et validation**

- **Validation des requêtes** : S’assurer qu’elles respectent le schéma.
- **Exécution des requêtes** : Résolution des champs via des résolveurs spécifiques.

**Gestion des erreurs :** Si une erreur se produit, GraphQL retourne une réponse partielle avec une section dédiée aux erreurs :

```json
{
  "data": null,
  "errors": [
    {
      "message": "User not found",
      "path": ["user"]
    }
  ]
}
```

_(Source : [spec.graphql.org, Section 6](https://spec.graphql.org))_

---

### **Mise en œuvre pratique**

#### **1. Créer un serveur GraphQL**

- Utiliser une bibliothèque comme **Apollo Server** ou **Express-GraphQL**.

**Exemple avec Node.js :**

```javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

---

#### **2. Intégration avec le front-end**

- Utiliser des clients comme **Apollo Client** ou **Relay**.
- Intégrer avec React pour gérer l’état global et les requêtes.

_(Source : [graphql.org/tools](https://graphql.org/learn/tools/))_

---

### **Avantages et limites**

#### **Avantages :**

- Requêtes sur mesure.
- Typage strict pour la validation.
- API unique et évolutive.

#### **Limites :**

- Courbe d'apprentissage initiale pour les équipes.
- Complexité accrue pour les petites applications.

---

### **Conclusion**

GraphQL représente une avancée majeure pour les développeurs cherchant à optimiser les interactions client-serveur. Avec son type système rigoureux et sa flexibilité, il s’intègre parfaitement dans des applications modernes nécessitant des données dynamiques et complexes.

Pour approfondir, explore les outils comme [GraphiQL](https://github.com/graphql/graphiql) ou essaye de construire une API avec un framework de ton choix. Si tu veux des exercices pratiques ou des questions supplémentaires, fais-moi signe !