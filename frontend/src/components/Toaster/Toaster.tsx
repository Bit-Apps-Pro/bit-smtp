import { Toaster as Toast } from 'react-hot-toast'

export default function Toaster() {
  return (
    <Toast
      position="bottom-right"
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff'
        },
        success: {
          duration: 3000
        }
      }}
    />
  )
}
