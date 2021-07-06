import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

// function exampleReducer(state, action) {
//   switch (action.type) {
//     case 'close':
//       return { open: false }
//     case 'open':
//       return { open: true, size: action.size }
//     default:
//       throw new Error('Unsupported action...')
//   }
// }

export interface ConfirmSubTaskStatusProps {
  openAlertSTF?,
  confirmSubTaskStatus?,
  cancelSubTaskStatus?,
  taskId?
  subTaskId?,
  subTaskStatus?,
  name?
}
export function ConfirmSubTaskStatus(props: ConfirmSubTaskStatusProps) {
  // const [state, dispatch] = React.useReducer(exampleReducer, {
  //   open: false,
  //   size: undefined,
  // })
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (props.openAlertSTF) {
      setOpen(props.openAlertSTF);
    }
  }, [props.openAlertSTF]);
  const openf = () => {
    setOpen(true)
  }
  const clickConfirm = () => {
    setOpen(false)
    props.confirmSubTaskStatus(props.taskId, props.subTaskId, props.subTaskStatus)
  }
  const clickCancel = () => {
    setOpen(false)
    props.cancelSubTaskStatus()
  }
  const size = undefined
  return (
    <Modal
      size={size}
      onClose={() => setOpen(false)}
      onOpen={openf}
      open={open} className="mini"
    >
      {/* <Modal.Header>Update your Task</Modal.Header> */}
      <Modal.Header>Update {props.name} Status
        <a className="float_right" onClick={clickCancel}>  <i className="ms-Icon ms-Icon--CalculatorMultiply mr-10" aria-hidden="true"></i></a>
      </Modal.Header>
      <Modal.Content>
        <p className="text-center" style={{ color: "black" }}>Are you sure you want to {props.subTaskStatus} the  {props.name}? </p>
      </Modal.Content>
      <Modal.Actions className="float_right">
        <Button positive onClick={clickConfirm}>
          Yes
        </Button>
        <Button negative onClick={clickCancel}>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmSubTaskStatus;
