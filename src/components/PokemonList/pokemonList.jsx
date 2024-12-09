import { useEffect,useState } from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    // const [pokemonList,setPokemonList]=useState([]);
    // const [isLoading,setIsLoading]=useState(false);
    // const [POKEDEX_URl,setPokedexUrl]=useState("https://pokeapi.co//api/v2/pokemon")
    // const [nextUrl,setNextUrl]=useState('');
    // const [prevUrl,setPrevUrl]=useState('');
    const [pokemonListState,setPokemonListState]=useState({
        pokemonList :[],
        isLoading:true,
        POKEDEX_URL:'https://pokeapi.co//api/v2/pokemon',
        nextUrl:'',
        prevUrl:'',
    }
    )
   async  function downloadPokemons()
   {
    setPokemonListState((state)=>({...state, isLoading:true}));
       const response=await axios.get(pokemonListState.POKEDEX_URL); // this downloads the list of 20 pokemons
       const pokemonResults=response.data.results; // we get the array of pokemons from result
       // iterating over the array of pokemons and using thier URL's to create an array of promisises  that will download those 20 pokemons
       console.log(response.data);
       setPokemonListState((state)=>({...state,
        nextUrl:response.data.next,
        prevUrl:response.data.previous
    }
)
);
       const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
       console.log(pokemonResultPromise);
       // passing that promise array to axios.all 
       const pokemondata=await axios.all(pokemonResultPromise);
       console.log(pokemondata);// araay of 20 pokemons  detailed data
       // now iterate on the data of each pokemin and extract id, name , image
       const res=pokemondata.map((pokeData)=>{
        const pokemon=pokeData.data;
        return { id:pokemon.id,
             name:pokemon.name ,
            image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default:pokemon.sprites , types:pokemon.types} 
       });
       console.log(res);
       setPokemonListState((state)=>({...state,pokemonList : res,isLoading:false
       }));
    }
    useEffect(()=>{
        downloadPokemons();
    } ,[pokemonListState.POKEDEX_URL]);
    return (
    <div className="Pokemon-List-wrapper">
        <div className= "pokemon-wrapper">
            {
                (pokemonListState.isLoading) ? 'Loading......': 
                pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
            }
            </div>
            <div className="controls">
                <button disabled={!pokemonListState.prevUrl} onClick={() => {
                    setPokemonListState((state) => ({ ...state, POKEDEX_URL: state.prevUrl }));
                }}>Prev</button>
                <button disabled={!pokemonListState.nextUrl} onClick={() => {
                    setPokemonListState((state) => ({ ...state, POKEDEX_URL: state.nextUrl }));
                }}>Next</button>
            </div>
    </div>
    )
}
export default PokemonList;
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import './PokemonList.css';
// import Pokemon from "../Pokemon/Pokemon";

// function PokemonList() {
//     const [pokemonListState, setPokemonListState] = useState({
//         pokemonList: [],
//         isLoading: true,
//         POKEDEX_URL: 'https://pokeapi.co/api/v2/pokemon',
//         nextUrl: '',
//         prevUrl: '',
//     });

//     async function downloadPokemons() {
//         setPokemonListState((state) => ({ ...state, isLoading: true }));
        
//         try {
//             const response = await axios.get(pokemonListState.POKEDEX_URL);
//             const pokemonResults = response.data.results;

//             setPokemonListState((state) => ({
//                 ...state,
//                 nextUrl: response.data.next,
//                 prevUrl: response.data.previous
//             }));

//             const pokemonResultPromises = pokemonResults.map((pokemon) => axios.get(pokemon.url));
//             const pokemonData = await axios.all(pokemonResultPromises);
            
//             const res = pokemonData.map((pokeData) => {
//                 const pokemon = pokeData.data;
//                 return {
//                     id: pokemon.id,
//                     name: pokemon.name,
//                     image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default,
//                     types: pokemon.types
//                 };
//             });

//             setPokemonListState((state) => ({
//                 ...state,
//                 pokemonList: res,
//                 isLoading: false
//             }));
//         } catch (error) {
//             console.error("Error downloading Pokemon data: ", error);
//             setPokemonListState((state) => ({ ...state, isLoading: false }));
//         }
//     }

//     useEffect(() => {
//         downloadPokemons();
//     }, [pokemonListState.POKEDEX_URL]);

//     return (
//         <div className="Pokemon-List-wrapper">
//             <div className="pokemon-wrapper">
//                 {pokemonListState.isLoading ? 'Loading......' :
//                     pokemonListState.pokemonList.map((p) => (
//                         <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
//                     ))
//                 }
//             </div>
//             <div className="controls">
//                 <button disabled={!pokemonListState.prevUrl} onClick={() => {
//                     setPokemonListState((state) => ({ ...state, POKEDEX_URL: state.prevUrl }));
//                 }}>Prev</button>
//                 <button disabled={!pokemonListState.nextUrl} onClick={() => {
//                     setPokemonListState((state) => ({ ...state, POKEDEX_URL: state.nextUrl }));
//                 }}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default PokemonList;
