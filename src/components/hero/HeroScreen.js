import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

//import batman from '../../assets/dc-batman.jpg';

const heroImages = require.context('../../assets', true)

export const HeroScreen = () => {

  const { heroeId } = useParams();
  const navigate = useNavigate();  

  const hero = useMemo( () => getHeroById(heroeId), [heroeId] );

  if(!hero) {
    return <Navigate to='/' />
  }


  const handleRegresar = () => {
    navigate(-1);

  }

  const {
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero;

  //const imagePath = `../assets/${id}.jpg`

  //console.log(imagePath);

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img 
          //src={imagePath}
          //src={batman} //con un import
          src= { heroImages(`./${ id }.jpg`) }
          alt={superhero} 
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>  
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alter ego: </b> {alter_ego}</li>
          <li className="list-group-item"><b>Publisher: </b> {publisher}</li>
          <li className="list-group-item"><b>First Appearance: </b> {first_appearance}</li>
        </ul>
        
        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>

        <button
          className="btn btn-primary"
          onClick={handleRegresar}
        >
          Regresar
        </button>

      </div>    
    </div>
  )
}
