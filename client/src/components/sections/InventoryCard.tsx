import { useState } from 'react'
import { useInventory } from '../../context/inventoryContext'
// import { useFunction } from '../../context/functionsContext'
import { EditForm } from './EditForm'
import { Inputs } from './largeTypes/sections.types'

export default function Inventory(props: Inputs){
  const { name, imgUrl, description, price, type, size, madeToOrder, colorOptions, materials, yarnWeight, _id} = props
  const {deleteProduct, editProduct} = useInventory()
  // const {handleChange, handleChecked, handleSubmit} = useFunction()
  const [toggle, setToggle] = useState(false)
  const [inputs, setInputs] = useState(props)



  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>){
    const {name, value, type} = event.target 
    if (type === "number") {
      setInputs(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else {
      setInputs(prev => ({ ...prev, [name]: value }))
    }
  }
  function handleCheckboxChange (event: React.ChangeEvent<HTMLInputElement> ){
    const {name, value, type, checked} = event.target 
    setInputs(prev => ({...prev, [name]: type === "checkbox" ? checked : value}))

  }
  function handleChecked(event: React.ChangeEvent<HTMLInputElement>){
    const { value, checked } = event.target
    if(checked === true){
      setInputs(prev => ({
        ...prev,
        materials: [...prev.materials, value]
      }))
    } else {
      setInputs(prev => ({
        ...prev,
        materials: prev.materials.filter(material => material != value )
      }))
    }
  }

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    editProduct(inputs, idCheck())
    setToggle(prev => !prev)
  }

  const idCheck = () => {
    const Id = _id
    if(Id === undefined) {
      throw new Error('Id not found. Unable to remove from Cart')
    }
    return Id
  }
  return (
    <div className='card inventoryCard'>
      {!toggle ?
      <>
      <h1 className='cardTitle titleWBackground'>{name}</h1>

      <div className='cardImgContainer'>
        <img className='cardImg' src={imgUrl} />
      </div>

      <div className='cardMain topFlat'>
        <div className='inventoryDescr'>
          <p className='inventoryItem'>{description}</p>
        </div>
        
        <div className='inputWLabel border'>
          <span className='inventoryItem'>Price: </span>
          <span>${price}</span>
        </div>
        
        <div className='inputWLabel border'>
          <span className='inventoryItem'>Type:</span> 
          <span>{type}</span>
        </div>
        
        <div className='inputWLabel border'>
          <span className='inventoryItem'>Size:</span> 
          <span>{size}</span>
        </div>
        
        <div className='inputWLabel border '>
          <span className='inventoryItem'>Made to Order:</span>
          <span>{madeToOrder ? 'Yes' : 'No'}</span>
        </div>
        
        
        
        <div className='inputWLabel border'>
          <span className='inventoryItem'>Color Options: </span>
          <span>{colorOptions}</span>
        </div>
        
        
        <p>Materials</p>
        <div className='materialsList inventoryMaterials' >
        {materials.map((material, index) => (
        <span key={index} className='materialSpan'> / {material} / </span>
        ))}        
      </div>

        <p className='inventoryItem'>Majority Yarn Weight: {yarnWeight}</p>
      </div>
      
      </>
      :
      <>
        <EditForm 
          handleChange={() => handleChange}
          handleCheckboxChange={() => handleCheckboxChange}
          handleChecked={() => handleChecked}
          handleSubmit={() => handleSubmit}
          inputs={inputs}
        />
      </>
      } 

      <div className='btnContainer multiple'>
        <button 
          className='cardBtn'
          onClick={() => deleteProduct(idCheck())}
        >Delete</button>

        <button 
          className='cardBtn'
          onClick={() => setToggle(prev => !prev)}
        >
          {!toggle ? "Edit" : "Close"}
        </button>
      </div>
    </div>
  )
}