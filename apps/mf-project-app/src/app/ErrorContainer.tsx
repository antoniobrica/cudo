import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { usePrevious } from '../app/redux/hooks/hooks'
// import Route from './Route/Route'
import App from '../app/app';
import 'react-toastify/dist/ReactToastify.css'

// const App = lazy(() => import('./app/app'))

function ErrorContainer(props) {
  const { error } = props
  toast.configure({ autoClose: 2000, draggable: false })

  const prevError = usePrevious(error)
  useEffect(() => {
    if (prevError !== error && error.length) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }, [error])

  return (
    <>
      <ToastContainer />
      <App />
    </>
  )
}

const mapStateToProps = state => ({
  error: state.error
})

export default connect(mapStateToProps)(ErrorContainer)
