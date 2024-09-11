import { useInventory } from '../../context/inventoryContext'
import { Header } from '../sections/Header'
import Form from '../sections/Form'
import InventoryCard from '../sections/InventoryCard'

export const Inventory = () => {
  const {inventoryCollection} = useInventory()  

  const inventoryMapped = inventoryCollection.map(info => (
    <InventoryCard 
      {...info}
      key={info._id}
    />
  ))

  return (
    <>
      <Header
        size={'big'} 
        header={'Inventory'}
      />
      
      <main>
        <Form />

        <div className='cardsContainer'>
          {inventoryMapped}
        </div>
      </main>
    </>
  )
}