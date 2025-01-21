const resolvers = {
    Query: {
      hello: () => "Bonjour, GraphQL avec Apollo Server moderne !",
      calcul: (_, { a, b }) => a + b, // Par exemple, additionne a et b
      statues: () => true,
      user: () => ({
        id: '1',
        name: 'Alice',
        age: 30,
        email: 'alice@example.com',
        isActive: true,
      }),
      items: () => [
        { id: '1', title: 'Apple', price: 0.5, inStock: true },
        { id: '2', title: 'Banana', price: 0.3, inStock: false },
        { id: '3', title: 'Cherry', price: 1.2, inStock: true },
      ],
    },
  };
  
export default resolvers;
  