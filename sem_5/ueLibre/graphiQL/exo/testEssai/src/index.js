import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { startStandaloneServer } from '@apollo/server/standalone';


// Définition d'un type



// Définition du schema GraphQl
const typeDefs = gql`
    type Tache {
        id: ID,
        titre: String,
        terminer: Boolean,
    },

    type Query {
        hello: String,
        calcul(a: Int!, b: Int!): Int,
        taches: [Tache],
    },

    type Mutation {
        ajouterTache(titre: String!, terminer: Boolean!): Tache,
    },
`;


let tasks = [
    {id: "1", titre: "Apprendre GraphQl", terminer: false},
    {id: "2", titre: "Faire le ménage", terminer: true},
];


// Resolveur du schema

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        calcul: (_, args) => {
            const result =  args.a + args.b;
            return result;
        },
        taches: () => tasks,
    },
    Mutation: {
        ajouterTache: (_, {titre,terminer}) => {
            const newTask = {
                id: tasks.length + 1,
                titre,
                terminer
            };
            tasks.push(newTask);
            return newTask;
        },
    },
};


// Création du serveur Apollo

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


// Lancé le serveur Apollo

startStandaloneServer(server,{
    listen: {port: 4000}
}).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
}
);