import RequireAuth from "../../../hooks/Authguard"
import { BalancePage } from "../views/BalancePage/BalancePage"
import HomePage from "../views/HomePage/HomePage"
import ManualConvertCryptoToFiatPage from "../views/ManualConvertCryptoToFiatPage/ManualConvertCryptoToFiatPage"
import TransferCryptoPage from "../views/TransferCryptoPage/TransferCryptoPage"
import { routesNamesApp } from "./routesNames"

const routesApp = [
  {
    path: routesNamesApp.homePage,
    element: <HomePage/>
  },
  
  {
    path: routesNamesApp.balance,
    element: < BalancePage />
  },
  {
    path: routesNamesApp.newConversionManual,
    element: <RequireAuth> < ManualConvertCryptoToFiatPage /></ RequireAuth>
  },
  {
    path: routesNamesApp.transferCrypto,
    element: <RequireAuth> < TransferCryptoPage /></ RequireAuth>
  },
]

export default routesApp
