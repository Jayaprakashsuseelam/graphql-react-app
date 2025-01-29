/**
 * Author : JP
 */
// src/PokemonList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POKEMONS = gql`
  query {
    pokemons(first: 10) {
      id
      name
      image
    }
  }
`;
const PokemonList = () => {
    const imageStyle = {
        display: 'inline-block',
        width: '100px',
        height: '100px',
        marginRight: '10px', // Adds space between images
        borderRadius: '8px', // Rounds the corners of the image
    };
    const liStyle = {
        display: 'inline-block',
    }
    const conDivStyle = {
        margin: '0 auto', // Centers the content horizontally
        width: '60%', // Specifies the content width
        textAlign: 'center', // (Optional) Centers text inside the div
    }
    const { loading, error, data } = useQuery(GET_POKEMONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div style={conDivStyle}>
            <h1>Pokemon List</h1>
            <ul>
                {data.pokemons.map((pokemon) => (
                    <li style={liStyle} key={pokemon.id}>
                        <img src={pokemon.image} alt={pokemon.name} style={imageStyle} />
                        <p>{pokemon.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
