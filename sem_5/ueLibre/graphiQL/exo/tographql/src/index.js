import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'



// Notre contrat que nous offrons aux utilisateur à travers notre serveur graphQL

const typeDefs = `
    type Query {
        hello(name: String, secondName: String): String!
    }
`

// Implémentons le 
const resolvers = {
    Query: {
        hello: (_, { name,secondName }) => `Hello I am ${name || 'Toutabizzi'} and my friend is ${secondName || 'Goat'} It s our technologie`,
    },
}


const yoga = createYoga({
    schema: createSchema({
        typeDefs,resolvers
    })
})




const server = createServer(yoga)

server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
})