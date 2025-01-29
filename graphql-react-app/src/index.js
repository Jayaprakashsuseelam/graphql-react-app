/**
 * Author : JP
 */
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './ApolloClient';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Use createRoot

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
