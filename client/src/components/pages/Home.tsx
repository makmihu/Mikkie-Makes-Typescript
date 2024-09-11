import { useInventory } from '../../context/inventoryContext'
import { Header } from '../sections/Header'
import { HomeCard } from '../sections/HomeCard'

export const Home = () => {
  const { inventoryCollection } = useInventory()

  const productsMapped = inventoryCollection.map(info => (
    <HomeCard 
      key={info._id}
      {...info}
    />
  ))

  return (
    <>
      <Header 
        size={'big'}
        header={'Mikkie Makes'}
        subHeader={"Crochet, Amigurumi, & More!"}
      />
      <main>
        <div className='cardsContainer'>
          {productsMapped}
        </div>
      </main>
    </>
  )

}

