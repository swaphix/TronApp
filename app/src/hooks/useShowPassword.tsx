import { useState, useEffect } from 'react'

const useShowPasswordHandling = () => {
  const [showPassword, setShowPassword] = useState<string>('password')

  const view = () => {
    let temp = showPassword
    if (temp === 'password') {
        temp = 'text'
    }
    else {
        temp = 'password'

    }
    setShowPassword(temp)
  }

  useEffect(() => {
    return
  }, [])

  return {
    showPassword,
    view
  }
}

export default useShowPasswordHandling
