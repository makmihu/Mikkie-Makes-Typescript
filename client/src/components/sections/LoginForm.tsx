import React from "react"

type LoginFormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
  btnText: string
  errMsg: string 
  inputs: {
    username: string 
    password: string
  }
}

export const LoginForm = (props: LoginFormProps) => {
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
      username, 
      password
    } 
  } = props  
  
  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <input
        className='formItem loginInput' 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"
      />

      <input 
        className='formItem loginInput'
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"
      />

      <button className='loginFormBtn'>{ btnText }</button>
      <p style={{color: "red", paddingTop: "10px"}}>{errMsg}</p>
    </form>
  )
}