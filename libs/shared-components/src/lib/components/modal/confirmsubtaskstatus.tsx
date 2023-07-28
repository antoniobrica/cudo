import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const {t} = useTranslation()
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
      closeIcon
      size={size}
      onClose={() => setOpen(false)}
      onOpen={openf}
      open={open} 
      className="delete-confiramtion-popup"
      closeOnDimmerClick={false}
    >
      {/* <Modal.Header>Update your Task</Modal.Header> */}
      {/* <Modal.Header>Update {props.name} Status
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
    </Modal> */}
    <div className="delete-confirmation-con">
          <Modal.Content>
            {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
            <Icon name="shield alternate"></Icon>
            <h3>{t("common.please_confirm")}</h3>
            <p>{t("project_tab_menu.task.are_you_sure")} {props.subTaskStatus} {t("project_tab_menu.task.the")} {props.name}? </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={clickCancel}>{t("common.cancel")}</Button>
            <Button className="primary" positive onClick={clickConfirm}>{t("common.confirm")}</Button>
          </Modal.Actions>
        </div>
      </Modal>
  )
}

export default ConfirmSubTaskStatus;
