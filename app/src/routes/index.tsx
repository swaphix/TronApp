import { createBrowserRouter } from 'react-router-dom'
import { routesNames } from './routes'
import { WelcomePage } from '../features/auth/views/WelcomePage/WelcomePage'
import { CloseAccount } from '../common/components/messages/CloseAccount'
import { Layout } from '../features/auth/views/Layout/Layout'
import routesAuth from '../features/auth/routes'
import LayoutApp from '../features/user/views/Layout/LayoutApp'
import routesApp from '../features/user/routes'
import RequireAuth from '../hooks/Authguard'
import MessageFastConvertionSuccess from '../common/components/messages/MessageFastConvertionSuccess'
import MessageManualConvertionSuccess from '../common/components/messages/MessageManualConvertionSuccess'
import MessageTransferSuccess from '../common/components/messages/MessageTransferSuccess'

const router = createBrowserRouter([
  {
    path: routesNames.initPage,
    element: < WelcomePage />
  },
  {
    path: routesNames.messageLogoutUser,
    element: <CloseAccount />,
  },
  {
    path: routesNames.initPage,
    element: <Layout />,
    children: routesAuth
  },
  {
    path: routesNames.app,
    element: <LayoutApp />,
    children: routesApp
  },
  {
    path: routesNames.messageSuccessConvertionDirectCrypto,
    element: <RequireAuth> <MessageFastConvertionSuccess />,</RequireAuth>,
  },
  {
    path: routesNames.messageSuccessConvertionManualDirectCrypto,
    element: <RequireAuth> <MessageManualConvertionSuccess />,</RequireAuth>,
  },
  {
    path: routesNames.messageSuccesstransferCrypto,
    element: <RequireAuth> <MessageTransferSuccess />,</RequireAuth>,
  },
])

export default router
