import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

  function exampleReducer(state, action) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size }
      default:
        throw new Error('Unsupported action...')
    }
  }

const ModalAlert = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  return (
    <>
      <Button className="float_right" onClick={() => dispatch({ type: 'open', size: 'mini' })}>
        Alert
      </Button>
    

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Delete Your Account
        <a href="" className="float_right">  <i className="ms-Icon ms-Icon--CalculatorMultiply mr-10" aria-hidden="true"></i></a> 
          
          </Modal.Header> 
        <Modal.Content>
          <p style={{color: "black"}} className="text-center">Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions className="float_right">
        <Button positive onClick={() => dispatch({ type: 'close' })}>
            Yes
          </Button>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
       
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ModalAlert
