import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Inputs } from "../components/sections/largeTypes/sections.types";

type InventoryProviderProps = {
  children: React.ReactNode
}
type InventoryContextType = {
  inventoryCollection: Inputs[] | []
  addProduct: (newProduct: {inputs: Inputs;}) => void  
  deleteProduct: (productId: string) => Promise<void>
  editProduct: (updates: any, productId: string) => Promise<void> 
}

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
});

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({children}: InventoryProviderProps) => {
  const [inventoryCollection, setInventoryCollection] = useState<Inputs[] | []>([])

  const getInventory = async () => {
    try {
      const res = await axios.get('/api/get/inventory')
      setInventoryCollection(res.data)
    } catch (err: any) {
      console.log(err.response.data.errMsg)
    }
  }

  const addProduct = async (newProduct: { inputs: Inputs }) => {
    try {
      const res = await userAxios.post('/api/admin/inventory', newProduct)  
      setInventoryCollection(prev => [...prev, res.data])
    } catch (err: any) {
      console.log(err.response.data.errMsg)  
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      await userAxios.delete(`/api/admin/inventory/${productId}`)
      setInventoryCollection(prev => prev.filter(product => product._id !== productId))
    } catch (err: any) {
      console.log(err.response.data.errMsg)  
    }
  }

  const editProduct = async (updates: any, productId: string) => {
    try {
      const res = await userAxios.put(`/api/admin/inventory/${productId}`, updates)
      setInventoryCollection(prev => prev.map(product => product._id !== productId ? product : res.data))
    } catch (err: any) {
      console.log(err.response.data.errMsg)  
    }
  }

  useEffect(() => {
    getInventory() 
  }, [])
return <InventoryContext.Provider 
  value={{        
    inventoryCollection,
    addProduct,
    deleteProduct,
    editProduct  
  }}
>
  {children}
</InventoryContext.Provider>
}

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};