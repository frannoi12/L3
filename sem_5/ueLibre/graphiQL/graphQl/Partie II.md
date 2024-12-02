
### **Fonctionnalités avancées de GraphQL**

1. **Fragments** :
    
    - Permettent de réutiliser des blocs de requêtes pour éviter les répétitions.
    - Exemple :
        
        ```graphql
        fragment UserDetails on User {
            id
            name
            email
        }
        
        query {
            user(id: "1") {
                ...UserDetails
                posts {
                    content
                }
            }
        }
        ```
        
2. **Directives** :
    
    - Ajoutent des fonctionnalités dynamiques aux requêtes comme des conditions.
    - Exemple :
        
        ```graphql
        query getUser($includeEmail: Boolean!) {
            user(id: "1") {
                name
                email @include(if: $includeEmail)
            }
        }
        ```
        
3. **Gestion des erreurs** :
    
    - Les réponses GraphQL incluent une section `errors` pour indiquer des problèmes spécifiques.
    - Exemple de réponse avec erreur :
        
        ```json
        {
            "data": null,
            "errors": [
                {
                    "message": "User not found",
                    "locations": [{ "line": 2, "column": 3 }],
                    "path": ["user"]
                }
            ]
        }
        ```
        
4. **Subscriptions** :
    
    - Permettent une communication en **temps réel** (comme les notifications ou les mises à jour en direct).
    - Exemple de subscription (avec WebSocket) :
        
        ```graphql
        subscription {
            postAdded {
                id
                content
                author {
                    name
                }
            }
        }
        ```
        
5. **Types d'union et interfaces** :
    
    - Les **types d'union** permettent de retourner plusieurs types possibles pour un même champ.
    - Les **interfaces** définissent des structures communes pour plusieurs types.
    - Exemple :
        
        ```graphql
        interface SearchResult {
            id: ID!
        }
        
        type User implements SearchResult {
            id: ID!
            name: String
        }
        
        type Post implements SearchResult {
            id: ID!
            content: String
        }
        
        type Query {
            search(query: String!): [SearchResult]
        }
        ```
        
6. **Fédérations de services (GraphQL Federation)** :
    
    - Permettent de composer plusieurs microservices GraphQL en un seul point d'entrée.
    - Utilisé avec **Apollo Federation** pour orchestrer un schéma unifié.
7. **Pagination et filtrage** :
    
    - Utilisation de paramètres comme `limit`, `offset` ou des **connections** pour des paginations sophistiquées.
    - Exemple de pagination avec connections (modèle Relay) :
        
        ```graphql
        query {
            posts(first: 10, after: "cursor123") {
                edges {
                    node {
                        id
                        content
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
        ```
        
8. **Batching et DataLoader** :
    
    - Optimise les requêtes pour éviter les appels redondants à la base de données ou aux API externes.
9. **Sécurité et authentification** :
    
    - Implémenter des mécanismes pour limiter les accès aux données :
        - Authentification (JWT, OAuth, etc.).
        - Règles au niveau des resolvers pour gérer les autorisations.
10. **Monitoring et performance** :
    
    - Utilisation d'outils comme **Apollo Studio**, **GraphQL Voyager**, ou des middlewares pour suivre les performances des requêtes.



### **Quand GraphQL n’est-il pas adapté ?**

Malgré ses nombreux avantages, GraphQL peut ne pas convenir dans certains cas :

- Si l'application est simple et ne nécessite pas de flexibilité.
- Lorsque la surcharge en termes de performances ou de complexité d'implémentation n'est pas justifiée.
- Si l’équipe n’a pas suffisamment d'expérience pour bien architecturer un schéma efficace.

---

Avec ces points, le cours sur GraphQL est **pratiquement complet** ! Si tu veux approfondir un sujet en particulier (par exemple, les subscriptions, la sécurité, ou la fédération), fais-moi signe ! 😊