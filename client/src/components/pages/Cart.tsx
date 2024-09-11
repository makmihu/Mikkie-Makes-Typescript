import { useAuth } from '../../context/authContext'
import { CartCard } from '../sections/CartCard'
import { Header } from '../sections/Header'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cartCollection, userState } = useAuth()


  const cartMapped = cartCollection.map((info) => (
    <CartCard
      {...info}
      key={info.inputs._id}
    />
  ))

  return (
    <>
      <Header
        size={"small"}
        header={"Cart"}
      />
      {userState.token ?
        <main>
          {cartCollection.length > 0 ?
            <div className='cardsContainer'>
              {cartMapped}
            </div>
            :
            <div className='emptyCart'>
              <h1 className='emptyCartItem'>There Are No Items In Your Cart</h1>
              <h1 className='emptyCartItem'>Return To The Home Page to browse Items</h1>
            </div>
          }
        </main>
          :
         <div>
           <h1>Please Log In To Add Items To The Cart</h1>
           <Link to="/login">
             <button>Login</button>
           </Link>
         </div>
       } 
    </>
  )

}