import { Link } from 'react-router-dom';
import './Pokemon.css'
function Pokemon({name,image,id}){
return (
    <div className='pokemon'>
        <Link to= {`/pokemon/${id} `}> 
            <div className='p-name'>{name}</div>
            <div>
                <img className="pokemon-img"src={image} alt="" />
            </div>
        </Link>
        </div>
)

}
export default Pokemon;