import { useAuth } from './context/authContext' 
import { Routes, Route} from 'react-router-dom'
import { Home } from './components/pages/Home'
import Cart from './components/pages/Cart'
import About from './components/pages/About'
import ProductPage from './components/pages/ProductPage'
import Inventory from './components/sections/InventoryCard'
import Login from './components/pages/Login'
import Navbar from './components/sections/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { userState } = useAuth()

  return (
    <>
      <Navbar />

      <Routes>
        <Route 
          path='/' 
          element={<Home />}
        />
        <Route 
          path='/cart' 
          element={<Cart />}
        />    
        <Route 
          path='/about' 
          element={<About />}
        />
        <Route 
          path='/login' 
          element={<Login />}
        />          
        <Route 
          path='/:productId' 
          element={<ProductPage />}
        />        
        <Route 
          path='/inventory' 
          element={<ProtectedRoute token={userState.token}>
            <Inventory />
          </ProtectedRoute>}
        />
      </Routes>
    </>
  )
}

export default App