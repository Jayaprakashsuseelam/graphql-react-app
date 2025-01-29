/**
 * Author : JP
 */
import React, { useState } from "react";
import {gql, useQuery} from "@apollo/client";

const GET_ITEM_BY_ID = gql`
  query GetItemById($id: ID!) {
    item(id: $id) {
      id
      name
      description
    }   
  }
`;

const SearchItemById = () => {
    const [searchId, setSearchId] = useState("");

    const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
        variables: { id: searchId },
        skip: !searchId, // Skip the query if searchId is empty
    });

    console.log({ loading, error, data });
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Search Item By ID</h1>
            <input
                type="text"
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
            />
            <div className="mt-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">Error: {error.message}</p>}
                {data && data.item && (
                    <div className="p-4 border rounded bg-white">
                        <h2 className="font-bold text-lg">{data.item.name}</h2>
                        <p>{data.item.description}</p>
                    </div>
                )}
                {!loading && !data?.item && searchId && (
                    <p className="text-gray-500">No item found with the given ID.</p>
                )}
            </div>
        </div>
    );
};

export default SearchItemById;
