

interface OptionCardHomeProps {
  action: () => void;
  title: string;
  image: string;
  enable: boolean;

}


const OptionCardHome: React.FC<OptionCardHomeProps> = ({ action, title, image, enable} ) => {

  return enable ?  (
    <div className="min-w-xs w-90 max-w-xs flex flex-col h-48 rounded-md shadow-md cursor-pointer m-5 hover:shadow-2xl" onClick={action}>
      <img src={image} alt="opcion swaphix" className="rounded-t-md h-full"/>
      <span className="bg-purple text-globalWhite text-center font-bold py-1 rounded-b-md w-full">{title}</span>
    </div>
  ): (
    <div className="min-w-xs w-90 max-w-xs flex flex-col h-48 rounded-md shadow-md cursor-pointer m-5 hover:shadow-2xl" >
    <img src={image} alt="opcion swaphix" className="rounded-t-md h-full"/>
    <span className="bg-grayHigh text-globalWhite text-center font-bold py-1 rounded-b-md w-full">{title}</span>
    </div>
  )
}


export default OptionCardHome;