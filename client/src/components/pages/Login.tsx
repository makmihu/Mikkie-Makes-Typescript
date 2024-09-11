import { useState,} from 'react'
import { useAuth } from '../../context/authContext'
import { LoginForm } from '../sections/LoginForm'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const {userState, signup, login, resetAuthErr} = useAuth()
  const initInputs = { username: "", password: "" }
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)
  const [isLoggedin, setIsLoggedin] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e: React.ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e: React.ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    login(inputs)
    setIsLoggedin(!isLoggedin)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <main>
      { isLoggedin ?
        <Navigate to="/" />
      :
      <div className='loginContainer'>
        {!toggle ? 
            <>
              <LoginForm 
                handleChange={handleChange}
                handleSubmit={handleSignup}
                inputs={inputs}
                btnText="Sign up"
                errMsg={userState.errMsg}              
              />
              <p className='loginText' onClick={toggleForm}>Already a Member?</p>
            </> 
        : 
            <>
              <LoginForm 
                handleChange={handleChange}
                handleSubmit={handleLogin}
                inputs={inputs}
                btnText="Login"
                errMsg={userState.errMsg}              
              />
              <p className='loginText' onClick={toggleForm}>Need to Signup?</p>
            </> 
        }
      </div>
      }
    </main>
  )
}

