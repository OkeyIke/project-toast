import React from 'react'

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === 'Escape') {
        setToasts([])
      }
    }
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  function createToast(message, variant) {
    const nexToasts = [...toasts, { id: crypto.randomUUID(), message, variant }]
    setToasts(nexToasts)
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id
    })

    setToasts(nextToasts)
  }
  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
