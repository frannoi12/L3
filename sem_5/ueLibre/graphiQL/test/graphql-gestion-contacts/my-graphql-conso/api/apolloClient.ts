import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Définir le lien HTTP vers ton API GraphQL
const httpLink = createHttpLink({
  uri: "http://localhost:4000/", // Remplace par l'URL de ton serveur GraphQL
});

// Middleware pour ajouter le token d'authentification dans les headers
const authLink = setContext(async (_, { headers }) => {
  // console.log(authLink);
  const token = await AsyncStorage.getItem("token");
  // console.log(token);
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
