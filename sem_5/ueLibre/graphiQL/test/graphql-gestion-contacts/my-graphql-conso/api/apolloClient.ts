import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

// Définir le lien HTTP vers ton API GraphQL
const httpLink = createHttpLink({
  uri: "http://localhost:4000", // Remplace par l'URL de ton serveur GraphQL
});

// Middleware pour ajouter le token d'authentification dans les headers
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Création du client Apollo
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
