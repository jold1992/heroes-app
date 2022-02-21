import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
//import { heroes } from "../../data/heroes";


export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);
    
    const initialForm = {
        searchText: q,
    }

    const [ formValues, handleInputChange ] = useForm(initialForm)
    
    const { searchText } = formValues;
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();        
        //console.log(searchText);        
        navigate(`?q=${ searchText }`);        
    }


    return (
        <>
            <h1>Búsquedas</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Buscar"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />


                        <button 
                            className="btn btn-primary mt-1"
                            type="submit"                            
                            >
                            Buscar...
                        </button>


                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr/>

                    {
                        (q === '')
                            ? <div className="alert alert-info">Buscar un héroe</div>
                            : ( heroesFiltered.length === 0 ) && <div className="alert alert-danger"> No hay resultados: { q }</div>
                    }

                    {
                        heroesFiltered.map(hero => 
                            <HeroCard
                                key={hero.id}                                
                                {...hero}
                            />

                        )
                    }
                </div>
            </div>
        </> 
    )
  };
  