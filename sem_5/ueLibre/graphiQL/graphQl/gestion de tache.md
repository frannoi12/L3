

Avec express sans EC6


Créer un CRUD de gestion de tâches avec GraphQL est une excellente manière d'apprendre à manipuler les concepts de base comme les requêtes, mutations et schémas ! Voici un guide complet pour mettre en place ce projet.

---

### **Prérequis**

- Node.js installé
- Un gestionnaire de paquets comme `npm` ou `yarn`

---

### **1. Initialisation du projet**

1. Crée un dossier pour ton projet et initialise un projet Node.js :
    
    ```bash
    mkdir gestion-taches
    cd gestion-taches
    npm init -y
    ```
    
2. Installe les dépendances nécessaires :
    
    ```bash
    npm install express graphql express-graphql
    ```
    

---

### **2. Structure du projet**

Voici la structure de base :

```
gestion-taches/
├── index.js
└── tasksData.js
```

---

### **3. Les données de base**

Ajoute un fichier `tasksData.js` pour stocker les tâches en mémoire (simulant une base de données) :

```javascript
let tasks = [
  { id: 1, title: "Apprendre GraphQL", completed: false },
  { id: 2, title: "Créer un CRUD", completed: true },
];

module.exports = tasks;
```

---

### **4. Le serveur GraphQL**

Crée un fichier `index.js` pour configurer le serveur.

```javascript
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
let tasks = require("./tasksData");

// 1. Définir le schéma GraphQL
const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  input TaskInput {
    title: String!
    completed: Boolean
  }

  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskInput): Task
    deleteTask(id: ID!): String
  }
`);

// 2. Résolveurs GraphQL
const root = {
  getTasks: () => tasks,
  getTask: ({ id }) => tasks.find((task) => task.id == id),
  createTask: ({ input }) => {
    const newTask = { id: tasks.length + 1, ...input, completed: input.completed || false };
    tasks.push(newTask);
    return newTask;
  },
  updateTask: ({ id, input }) => {
    const index = tasks.findIndex((task) => task.id == id);
    if (index === -1) throw new Error("Task not found");
    tasks[index] = { ...tasks[index], ...input };
    return tasks[index];
  },
  deleteTask: ({ id }) => {
    const index = tasks.findIndex((task) => task.id == id);
    if (index === -1) throw new Error("Task not found");
    tasks.splice(index, 1);
    return `Task ${id} deleted`;
  },
};

// 3. Configurer Express avec GraphQL
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Interface pour tester les requêtes
  })
);

app.listen(4000, () => console.log("Serveur GraphQL sur http://localhost:4000/graphql"));
```

---

### **5. Tester le CRUD**

Accède à **[http://localhost:4000/graphql](http://localhost:4000/graphql)** avec l'interface GraphiQL. Voici quelques exemples de requêtes que tu peux essayer :

#### a. **Récupérer toutes les tâches** :

```graphql
query {
  getTasks {
    id
    title
    completed
  }
}
```

#### b. **Récupérer une tâche par ID** :

```graphql
query {
  getTask(id: 1) {
    id
    title
    completed
  }
}
```

#### c. **Créer une nouvelle tâche** :

```graphql
mutation {
  createTask(input: { title: "Tester les mutations", completed: false }) {
    id
    title
    completed
  }
}
```

#### d. **Mettre à jour une tâche** :

```graphql
mutation {
  updateTask(id: 1, input: { title: "Apprendre GraphQL en profondeur", completed: true }) {
    id
    title
    completed
  }
}
```

#### e. **Supprimer une tâche** :

```graphql
mutation {
  deleteTask(id: 2)
}
```

---

### **6. Prochaines étapes**

- Connecter une base de données comme MongoDB ou PostgreSQL pour une persistance réelle.
- Ajouter des validations et des messages d'erreur plus détaillés.
- Implémenter les **subscriptions** pour une mise à jour en temps réel.

N'hésite pas à me demander si tu veux approfondir un point particulier ! 🚀



Avec apollo et express sans EC6


Absolument ! On peut aussi créer ce CRUD de gestion de tâches avec **Apollo Server**, qui est une autre approche populaire et moderne pour gérer GraphQL. Apollo Server simplifie beaucoup de choses, comme la gestion des schémas et des résolveurs, tout en offrant une intégration facile avec d'autres outils.

Voici comment refaire le même CRUD en utilisant **Apollo Server** :

---

### **1. Initialisation du projet**

1. Comme précédemment, initialise un projet Node.js :
    
    ```bash
    mkdir gestion-taches-apollo
    cd gestion-taches-apollo
    npm init -y
    ```
    
2. Installe les dépendances nécessaires :
    
    ```bash
    npm install @apollo/server graphql cors body-parser express
    ```
    

---

### **2. Structure du projet**

Structure du projet :

```
gestion-taches-apollo/
├── index.js
└── tasksData.js
```

---

### **3. Les données de base**

Ajoute un fichier `tasksData.js` :

```javascript
let tasks = [
  { id: "1", title: "Apprendre GraphQL", completed: false },
  { id: "2", title: "Créer un CRUD avec Apollo Server", completed: true },
];

module.exports = tasks;
```

---

### **4. Le serveur Apollo**

Crée un fichier `index.js` pour configurer Apollo Server :

```javascript
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let tasks = require('./tasksData');

// 1. Définir le schéma avec SDL
const typeDefs = `
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  input TaskInput {
    title: String!
    completed: Boolean
  }

  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskInput): Task
    deleteTask(id: ID!): String
  }
`;

// 2. Définir les résolveurs
const resolvers = {
  Query: {
    getTasks: () => tasks,
    getTask: (_, { id }) => tasks.find((task) => task.id === id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = { id: `${tasks.length + 1}`, ...input, completed: input.completed || false };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_, { id, input }) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) throw new Error('Task not found');
      tasks[taskIndex] = { ...tasks[taskIndex], ...input };
      return tasks[taskIndex];
    },
    deleteTask: (_, { id }) => {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) throw new Error('Task not found');
      tasks.splice(taskIndex, 1);
      return `Task ${id} deleted`;
    },
  },
};

// 3. Configurer Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// 4. Intégrer Apollo avec Express
const app = express();
server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/');
  });
});
```

---

### **5. Tester le CRUD**

Rends-toi sur **[http://localhost:4000/](http://localhost:4000/)** et utilise l'interface Apollo Sandbox pour tester les requêtes.

#### a. **Récupérer toutes les tâches**

```graphql
query {
  getTasks {
    id
    title
    completed
  }
}
```

#### b. **Récupérer une tâche par ID**

```graphql
query {
  getTask(id: "1") {
    id
    title
    completed
  }
}
```

#### c. **Créer une nouvelle tâche** 

```graphql
mutation {
  createTask(input: { title: "Tester Apollo Server", completed: false }) {
    id
    title
    completed
  }
}
```

#### d. **Mettre à jour une tâche**

```graphql
mutation {
  updateTask(id: "1", input: { title: "Maîtriser GraphQL avec Apollo", completed: true }) {
    id
    title
    completed
  }
}
```

#### e. **Supprimer une tâche**

```graphql
mutation {
  deleteTask(id: "2")
}
```

---

### **Pourquoi choisir Apollo Server ?**

1. **Interface utilisateur intégrée** (Apollo Sandbox) pour tester les requêtes.
2. **Ecosystème riche** pour ajouter des fonctionnalités comme le caching, les abonnements (subscriptions), etc.
3. **Scalabilité** : Idéal pour des projets qui pourraient devenir complexes à l'avenir.

Si tu veux ajouter une base de données ou approfondir, dis-le-moi. 🚀


Avec EC6 et Apollo


Si tu veux utiliser **ES6 (ECMAScript 2015)** avec Apollo Server et Express, c'est une excellente idée pour profiter d'une syntaxe moderne et plus propre ! Voici comment adapter notre code CRUD en utilisant les fonctionnalités ES6, comme les `import/export`, les `arrow functions`, et les templates littéraux.

---

### **1. Préparer l'environnement pour ES6**

Node.js supporte nativement une bonne partie d'ES6, mais pour utiliser les **modules ECMAScript (ESM)** avec `import/export`, voici ce qu'il faut faire :

1. Assure-toi d'avoir une version récente de Node.js (14+).
2. Ajoute `"type": "module"` dans ton fichier `package.json` :
    
    ```json
    {
      "name": "gestion-taches-apollo",
      "version": "1.0.0",
      "type": "module",
      "main": "index.js",
      "dependencies": {
        "@apollo/server": "^4.3.0",
        "cors": "^2.8.5",
        "body-parser": "^1.20.2",
        "express": "^4.18.2",
        "graphql": "^16.6.0"
      }
    }
    ```
    

---

### **2. Structure du projet**

Structure mise à jour :

```
gestion-taches-apollo/
├── index.js        // Point d'entrée
└── tasksData.js    // Données simulées
```

---

### **3. Code avec ES6**

#### **`tasksData.js` (module pour les données simulées)**

```javascript
export let tasks = [
  { id: "1", title: "Apprendre GraphQL avec ES6", completed: false },
  { id: "2", title: "Utiliser Apollo Server en mode moderne", completed: true },
];

// Fonction pour ajouter, mettre à jour, ou supprimer une tâche
export const updateTasks = (newTasks) => {
  tasks = newTasks;
};
```

---

#### **`index.js` (Serveur Apollo avec ES6 syntaxe)**

```javascript
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { tasks, updateTasks } from "./tasksData.js";

// 1. Schéma GraphQL
const typeDefs = `
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  input TaskInput {
    title: String!
    completed: Boolean
  }

  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskInput): Task
    deleteTask(id: ID!): String
  }
`;

// 2. Résolveurs avec des fonctions fléchées
const resolvers = {
  Query: {
    getTasks: () => tasks,
    getTask: (_, { id }) => tasks.find((task) => task.id === id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = {
        id: `${tasks.length + 1}`,
        ...input,
        completed: input.completed || false,
      };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_, { id, input }) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) throw new Error("Task not found");
      tasks[index] = { ...tasks[index], ...input };
      return tasks[index];
    },
    deleteTask: (_, { id }) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) throw new Error("Task not found");
      const deletedTask = tasks[index];
      updateTasks(tasks.filter((task) => task.id !== id));
      return `Task "${deletedTask.title}" deleted`;
    },
  },
};

// 3. Configurer Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// 4. Intégrer Apollo avec Express
const app = express();
server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
  app.listen(4000, () =>
    console.log("🚀 Apollo Server prêt sur http://localhost:4000/")
  );
});
```

---

### **4. Points clés avec ES6**

- **Modules natifs :** `import/export` remplace `require` et `module.exports`.
- **Arrow functions** : Plus concises, elles sont utilisées pour tous les résolveurs et fonctions anonymes.
- **Littéraux de modèle :** Utilisation de backticks (``) pour les chaînes complexes comme les messages ou le schéma GraphQL.
- **Mise à jour immuable des données :** Les données sont mises à jour proprement avec la fonction `updateTasks`.

---

### **5. Tester le CRUD**

Les requêtes (comme celles mentionnées précédemment) restent exactement les mêmes. Tu peux les exécuter sur **[http://localhost:4000/](http://localhost:4000/)** via Apollo Sandbox.

---

### **6. Pourquoi utiliser ES6 avec Apollo ?**

1. **Lisibilité améliorée** : Syntaxe moderne, plus concise et propre.
2. **Modules standardisés** : Meilleure compatibilité avec les environnements modernes (comme TypeScript ou Webpack).
3. **Code réutilisable** : La séparation des fichiers (comme `tasksData.js`) facilite la gestion et la maintenance.

Si tu veux aller plus loin (ex. : connecter une base de données comme MongoDB avec ES6), fais-moi signe. 🚀








