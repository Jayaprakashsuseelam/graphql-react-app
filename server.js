/**
 * Author : JP
 */
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Sample data (in-memory database)
let items = [
    { id: '1', name: 'Item 1', description: 'Description 1' },
    { id: '2', name: 'Item 2', description: 'Description 2' },
];

// GraphQL schema
const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createItem(name: String!, description: String): Item!
    updateItem(id: ID!, name: String, description: String): Item!
    deleteItem(id: ID!): ID!
  }
`;

// Resolvers
const resolvers = {
    Query: {
        items: () => items,
        item: (parent, args) => items.find((item) => item.id === args.id),
    },
    Mutation: {
        createItem: (parent, args) => {
            const newItem = {
                id: String(items.length + 1),
                name: args.name,
                description: args.description,
            };
            items.push(newItem);
            return newItem;
        },
        updateItem: (parent, args) => {
            const item = items.find((item) => item.id === args.id);
            if (item) {
                item.name = args.name || item.name;
                item.description = args.description || item.description;
            }
            return item;
        },
        deleteItem: (parent, args) => {
            items = items.filter((item) => item.id !== args.id);
            return args.id;
        },
    },
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Express app
const app = express();

// Start the server and apply middleware
async function startServer() {
    await server.start(); // Ensure the server is started
    server.applyMiddleware({ app });

    // Start the Express server
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();
