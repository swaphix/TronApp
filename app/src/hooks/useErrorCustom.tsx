import { useState, useEffect } from 'react'
import { ApiError } from '../common/errors/errors'
// import toast from 'react-hot-toast'


const useErrorHandling = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleErrors = (error:any) => {
    if (error instanceof ApiError) {
      // toast.error('Respuesta de server:' + error.message.toString())
      setErrorMessage('Respuesta de server:' + error.message.toString())
      // if (error.statusCode === 404) {
      //   setErrorMessage('Usuario no encontrado: ' + error.message.toString())
      // } else if (error.statusCode === 500) {
      //   setErrorMessage('Error de servidor: ' + error.message.toString())
      // } else {
      //   setErrorMessage('Error de servicio: ' + error.message.toString())
      // }
    } else {
      setErrorMessage('Sucedio algo Inesperado: ' + error.message.toString())
      setErrorMessage(error.message.toString())
    }
  }

  useEffect(() => {
    // Limpia el mensaje de error cuando el componente se desmonta
    return () => {
      setErrorMessage('')
    }
  }, [])

  return {
    errorMessage,
    handleErrors
  }
}

export default useErrorHandling
