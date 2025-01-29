/**
 * Author : JP
 */
// src/mutations.js
import React, { useState, useEffect } from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';

const GET_ITEMS = gql`
     query Items {
      items {
        id
        name
        description
      }
    }
`;

const CREATE_ITEM = gql`
  mutation CreateItem($name: String!, $description: String!) {
      createItem(name: $name, description: $description) {
        id
        name
        description
      }
  }
`;

const InsertItem = ()  => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const { loading, error, data, refetch  } = useQuery(GET_ITEMS);

    const [createItem] = useMutation(CREATE_ITEM, {
        onCompleted: () => refetch(), // ✅ Correct usage of refetch from useQuery
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItem({
                variables: { name, description },
            });
            setSuccessMessage("Item created successfully!"); // Display success message
            setTimeout(() => {
                setSuccessMessage(""); // Clear the success message
            }, 3000);
            setName('');
            setDescription('');
        } catch (err) {
            console.error('Error creating item:', err);
        }
    };

    return (
        <div className="insert-item">
            <h1>Insert An Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="InputLabel">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="InputDescLabel">Description</label>
                    <textarea
                        className="inputTextarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required>
                    </textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Item'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            {successMessage && (
                <div className="successMessage" style={{ color: 'green', border: '1px solid green', padding: '10px', width: '20%', margin: '10px auto' }}>
                    {successMessage}
                </div>
            )}

        </div>
    );
}

export default InsertItem;
