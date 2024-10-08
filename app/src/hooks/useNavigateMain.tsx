import { useNavigate } from 'react-router';
import { routesNamesApp } from '../features/user/routes/routesNames';
import { routesNames } from '../routes/routes';
import { routesNamesAuth } from '../features/auth/routes/routesNames';
import { useEffect } from 'react';
import { changeSelect, changeVisible } from '../redux/mainSlice';
import { useDispatch } from 'react-redux';


const useNavigateMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const validateAndValidatePage = (index: number) => {
    dispatch(changeSelect({ select: index }));
    dispatch(changeVisible({ visible: false }));
    // debugger
    if (index === 0) {
      navigate(routesNamesApp.balance)
      return
    }
    else if (index === 1) {
      navigate(routesNamesApp.newTransactionPage)
      return
    }
    else if (index === 2) {
      navigate(routesNamesApp.balance)
      return
    }
    else if (index === 3) {
      navigate(routesNamesApp.history)
      return
    }
    else if (index === 4) {
      navigate(routesNamesApp.wallet)
      return
    }
    else if (index === 5) {
      navigate(routesNames.messageLogoutUser)
      return
    }
    else if (index === 6) {
      navigate(routesNamesApp.newConversion)
      return
    }
    else if (index === 7) {
      navigate(routesNamesAuth.newAccount)
      return
    }
  }
  useEffect(() => {
  }, [])

  return {
    validateAndValidatePage,
  }
}


export default useNavigateMain
