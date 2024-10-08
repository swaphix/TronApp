/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routesNamesAuth } from '../features/auth/routes/routesNames'
import AuthService from '../services/authService'


const RequireAuth = ({ children }:any) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthService.refreshToken()
        if (response === null) {
          setIsAuthenticated(false)
          navigate(routesNamesAuth.login)
        } else {
          setIsAuthenticated(true)
        }
      } catch (e:any) {
        setIsAuthenticated(false)
        navigate(routesNamesAuth.login)
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  if (loading) {
    // Renderizar un componente de carga o mensaje de espera mientras se verifica la autenticación.
    return <div>Cargando...</div>
  }

  return isAuthenticated ? children : null // Render children only if authenticated
}


export default RequireAuth
