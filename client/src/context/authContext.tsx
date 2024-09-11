import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Inputs } from "../components/sections/largeTypes/sections.types";

type AuthProviderProps = {
  children: React.ReactNode
}

type User = {
  username: String,
  password: String,
  memberSince: Date,
  isAdmin: Boolean,

}
type AuthContextType = {
  userState: { user: User, token: string, errMsg: string }
  resetAuthErr: () => void
  signup: (credentials: {}) => Promise<void>
  login: (credentials: {}) => Promise<void>
  logout: () => void
  cartCollection: [{inputs: Inputs}] | []
  setCartCollection: React.Dispatch<React.SetStateAction<{ inputs: Inputs }[]>>
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {

  const [cartCollection, setCartCollection] = useState<{ inputs: Inputs }[]>([])  

  const initState: AuthContextType['userState'] = {
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    token: localStorage.getItem('token') || '',
    errMsg: '',
  };
  const [userState, setUserState] = useState<AuthContextType['userState']>(initState)

  function handleAuthErr(errMsg:string){
    setUserState(prev => ({
      ...prev,
      errMsg
    }))
  }
  function resetAuthErr(){
    setUserState(prev => ({
      ...prev,
      errMsg: ""
    }))
  }
  const signup = async (credentials: {}) => {
    try {
      const res = await axios.post('/api/auth/signup', credentials)
      const {user, token} = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUserState(prev => ({
        ...prev,
        user, 
        token
      }))
    } catch (err: any) {
      handleAuthErr(err.response.data.errMsg)   
    }
  }
  const login = async (credentials: {}) => {
    try {
      const res = await axios.post('/api/auth/login', credentials)
      const {user, token} = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUserState(prev => ({
        ...prev,
        user, 
        token
      }))
    } catch (err: any) {
      handleAuthErr(err.response.data.errMsg)   
    }
  }
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user") 
    setUserState({
      user: {
        username: "guestUser",
        password: "none",
        memberSince: new Date(),
        isAdmin: false
      },
      token: "",
      errMsg: ""
    })    
  }

  return <AuthContext.Provider 
    value={{        
      userState,
      resetAuthErr,
      signup,
      login,
      logout,
      cartCollection,
      setCartCollection, 
  }}
  >
    {children}
  </AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};