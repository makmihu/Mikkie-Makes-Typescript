import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { Inputs } from './largeTypes/sections.types'

export const HomeCard = (props: Inputs) => {
  const { name, imgUrl, description, _id} = props
  const { setCartCollection } = useAuth()

  function handleClick(){
    setCartCollection(prev => ([
      ...prev,
      {
        inputs: props
      }
    ]))
  }

  return (
    <div className='card productCard'>
      <h1 className='cardTitle titleWBackground'>{name}</h1>

      <div className='cardImgContainer'>
        <img className='cardImg' src={imgUrl} />
      </div>
      
      <div className='cardMain topFlat'>
      <p className='homeDescr'>{description}</p>
      </div>

      <div className='btnContainer multiple'>
        <Link to={`${_id}`}><button className='cardBtn'>View</button></Link>
    
        <button className='cardBtn' onClick={handleClick}>Add to Cart</button>
      </div> 
    </div>
  )
}