
import { routesNamesAuth } from './routesNames'

import { LoginPasswordPage } from '../views/LoginPasswordPage/LoginPasswordPage'
import { LoginPage } from '../views/LoginPage/LoginPage'


const routesAuth = [
  {
    path: routesNamesAuth.login,
    element: < LoginPage />
  },
  {
    path: routesNamesAuth.loginPassword,
    element: < LoginPasswordPage />
  },
]

export default routesAuth
