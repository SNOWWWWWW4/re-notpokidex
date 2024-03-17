// import {saveToLocalStorage, getlocalStorage, removeFromLocalStorage} from './localStorage'

import { Pokemon, PokemonSpeciesData } from "../Interfaces/interface";

const pokemonApi = async (poke: string) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    const data : Pokemon = await promise.json();
    return data;
}

const pokemonLocation = async(poke:string) => {
    const promise= await fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke}`);
    const data = await promise.json();

    const promiseTwo = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`);
    const dataTwo = await promiseTwo.json();
    return dataTwo;
}

const pokemonEvolutions = async (poke: string) => {
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${poke}`);
    const data = await promise.json();

    const promiseTwo = await fetch(data.evolution_chain.url);
    const dataThree = await promiseTwo.json();

    return dataThree;
}

const pokemonDescription = async (poke: string): Promise<PokemonSpeciesData> => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke}/`);
    const data = await promise.json();

   return data;

}

export {pokemonApi, pokemonLocation, pokemonEvolutions, pokemonDescription}

