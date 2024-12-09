import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./PokemonDetails.css";
function PokemonDetails(){
    const {id}=useParams();
    const [pokemon,setPokemon]=useState({});
    async function dowmloadPokemon(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map( (t)=>
                t.type.name)
        })
        console.log(response.data);
    }
    useEffect(()=>{
        dowmloadPokemon();
    },[]);
    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-name">name: <span>{pokemon.name}</span></div>
            <img className="pokemon-details-image" src={pokemon.image} />
            <div>Height : {pokemon.height}</div>
            <div>weight : {pokemon.weight}</div>
            <div className="pokemon-details-types" >
                { pokemon.types && pokemon.types.map( (t)=> <div key={t}>  {t} </div>)} 
            </div>
        </div>
    );
}
export default PokemonDetails;