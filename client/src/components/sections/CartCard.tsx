import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { Inputs } from './largeTypes/sections.types'

type CardCartProps = {
  key: any
  inputs: Inputs
}

export const CartCard = ({inputs}: CardCartProps) => {
  const { setCartCollection } = useAuth()

  function handleClick(id: string){
    setCartCollection(prev => prev.filter(thing => thing.inputs._id !== id));
  }

  const idCheck = () => {
    const Id = inputs._id
    if(Id === undefined) {
      throw new Error('Id not found. Unable to remove from Cart')
    }
    return Id
  }
  return (
    <div className='card cartCard'>
      <div className='cardImgContainer'>
        <img className='cardImg' src={inputs.imgUrl} />
      </div>

      <h1 className='cardTitle'>{inputs.name}</h1>

      <div className='inputWLabel'>
        <span className='inventoryItem'>Price: </span>
        <span>${inputs.price}</span>
      </div>

      <div className='btnContainer multiple'>
      <Link to={`/${inputs._id}`}><button className='cardBtn'>View</button></Link>
            
        <button className='cardBtn' onClick={() => handleClick(idCheck())}>Remove</button>
      </div>
    </div>
  )
}