import { useAuth } from "../../context/authContext"
import { Link } from "react-router-dom"

export default function Navbar(){
  const { logout, userState } = useAuth()

  return (
    <nav className='navbar'>
      {userState.token === "" ?
        <Link className='links' to="/login">
          Login
        </Link>
      :
        <button className="links" onClick={logout}>
          Logout
        </button>
      }

      <Link className='links' to="/about">
        About
      </Link>

      <Link className='links' to="/">
        Home
      </Link>
      
      {userState.user.isAdmin && <Link className="links" to="/inventory">
        Inventory
      </Link>}

      <Link className='links' to="cart" >
        <i className="fa-solid fa-cart-shopping">Cart</i>
      </Link>
    </nav>
  )
}