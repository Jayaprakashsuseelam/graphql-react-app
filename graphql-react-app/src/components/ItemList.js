/**
 * Author : JP
 */
import React, { useState } from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
import PokemonList from "./PokemonList";
import "../App.css";

const GET_ITEMS = gql`
     query Items {
      items {
        id
        name
        description
      }
    }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

const GetItemsList = () => {
    const { loading, error, data, refetch  } = useQuery(GET_ITEMS);
    const [successMessage, setSuccessMessage] = useState("");
    // Delete item mutation
    const [deleteItem] = useMutation(DELETE_ITEM, {
        onCompleted: () => refetch(), // Refetch items after deletion
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleDelete = async (id) => {
        try {
            await deleteItem({
                variables: { id },
            });
            setSuccessMessage("Item deleted successfully!"); // Display success message
            setTimeout(() => {
                setSuccessMessage(""); // Clear the success message
            }, 3000);
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    return (
        <div className="table-container">
            <h1>GraphQL Items List</h1>
            <table className="table">
                <thead className="bg-gray-200">
                <tr>
                    <th className="text-left py-3 px-2 border-b border-gray-300">ID</th>
                    <th className="text-left py-3 px-4 border-b border-gray-300">Name</th>
                    <th className="text-left py-3 px-6 border-b border-gray-300">Description</th>
                    <th className="">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.items.length > 0 ? (
                    data.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="">{item.id}</td>
                            <td className="">{item.name}</td>
                            <td className="description">{item.description}</td>
                            <td className="delete"><a href="#" onClick={() => handleDelete(item.id)}>Delete</a></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={3}
                            className="no-data"
                        >
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {successMessage && (
                <div className="successMessage" style={{ color: 'green', border: '1px solid green', padding: '10px', width: '20%', margin: '10px auto' }}>
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default GetItemsList;
