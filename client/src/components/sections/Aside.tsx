type AsideProps = {
  color: string,
  img: string
}

export const Aside = ({color, img}: AsideProps) => {
  return (
    <div className={`aside ${color}`}>
        <img className='asideImg'  src={img}/>
    </div>
  );
}