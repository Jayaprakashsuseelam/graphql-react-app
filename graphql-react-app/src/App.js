/**
 * Author : JP
 */
// src/App.js
import React from 'react';
import PokemonList from './components/PokemonList';
import SearchItemById from "./components/SearchItemById";
import GetItemsList from "./components/ItemList";
import InsertItem from "./components/InsertItem";

function App() {
    return (
        <div className="App">
            <GetItemsList />
            <SearchItemById />
            <InsertItem />
            {/*<PokemonList />*/}
        </div>
    );
}

export default App;
