type HeaderProps = {
  size: string
  header: string 
  subHeader?: string
}

export const Header = ({size, header, subHeader}: HeaderProps) => {
  return (
    <div className='header'>
      <div className={`logo ${size}`}></div> 
      <div className='headerBox'>
        <h1 className='headerText head'>{header}</h1>
        <p className='headerText sub'>{subHeader}</p>
      </div>
    </div>
  )
}