import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { usePrevious } from 'hooks'
import Route from './Route/Route'
import 'react-toastify/dist/ReactToastify.css'

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
      <Route />
    </>
  )
}

const mapStateToProps = state => ({
  error: state.error
})

export default connect(mapStateToProps)(ErrorContainer)
