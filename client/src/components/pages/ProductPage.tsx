import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useInventory } from '../../context/inventoryContext'
import { Header } from '../sections/Header'
import { Aside } from '../sections/Aside'
import { Inputs } from '../sections/largeTypes/sections.types'

export default function ProductPage(){    
  const { setCartCollection } = useAuth()
  const { inventoryCollection } = useInventory()
  const {productId} = useParams()
  const chosenProduct: Inputs | undefined = inventoryCollection.find( product => product._id === productId )
  


  function handleClick(){
    if (chosenProduct) {
      const productInputs: Inputs = chosenProduct;
      setCartCollection(prev => ([
        ...prev, 
        {
          inputs: productInputs
        }
      ]));
    } else {
      console.error('Product not found');
    }

  }

  return (
    <>
    {chosenProduct === undefined ? 
      <Header 
        size="big"
        header='Product Not Found'
      />
      :
      <>
      <Header 
        size={"small"} 
        header={chosenProduct.name}
      />
      <main className='mainWithAside'>
        <div className='productDescContainer'>    
            <p className='info product'>{chosenProduct.description}</p>
            
            <p className='infoNoMargin'>**************************************</p>
            
            <div className='inputWLabel'>
              <p className='infoNoMargin'>Price:</p>
              <p className='infoNoMargin'>${chosenProduct.price}</p>
            </div>

            <p className='infoHeader'>Approximate Size:</p>
            <p className='info'>{chosenProduct.size}</p>
            
            <p className='infoHeader'>Materials: </p>
            <div className='info materialsList'>
              {chosenProduct.materials.length > 0 
              ? 
              chosenProduct.materials.map((material, index) => (
                <span key={index} className='materialSpan'>
                / {material} /
                </span>
              ))
              : 
              <p>No materials listed</p>
              }            
            </div>
          <button className='productBtn' onClick={handleClick}>Add to Cart</button>
        </div>
            
        <Aside 
          color={"green"}
          img={chosenProduct.imgUrl}
        />
      </main>
      </>
    }
  </>
  )
}