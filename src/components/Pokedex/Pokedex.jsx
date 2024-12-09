import Search from "../search/search";
import PokemonList from "../PokemonList/pokemonList";
import './pokedex.css'
function Pokedex(){
    return (
    <div className="pokedex-wrapper">
        <Search/>
        <PokemonList/>
    </div>
    )
}
export default Pokedex;