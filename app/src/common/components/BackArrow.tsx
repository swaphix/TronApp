import { useNavigate } from "react-router-dom";

const BackArrow = () => {
    const navigate = useNavigate();
    return (
      <div className="cursor-pointer px-5 sm:mt-5 flex items-center flex-row gap-2 w-full cursor-pointer" onClick={()=>navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="purple" className="w-6 h-6">
                  <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
              <p className="labelTxt text-purple font-bold">Regresar</p>
      </div>
    )
    
    
}
export default BackArrow;