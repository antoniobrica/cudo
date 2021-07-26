import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

  export interface AlertProps {
    openAlertF,
    confirm,
    planData,
    cancel,
  }
  export const PlanDelete = (props: AlertProps) => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (props.openAlertF) {
      setOpen(props.openAlertF);
    }
  }, [props.openAlertF]);
  const openf = () => {
    setOpen(true)
  }
  const yes =()=>{
    setOpen(false)
    props.confirm(props.planData)
  }
  const cancel =()=>{
    setOpen(false)
    props.cancel()
  }
const size = undefined
  return (
    <>

      <Modal
        closeIcon
        size={size}
        onClose={() => setOpen(false)}
        onOpen={openf}
        open={open} 
        className="delete-confiramtion-popup"
        closeOnDimmerClick={false}
      >
        <div className="delete-confirmation-con">
          <Modal.Content>
            {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
            <Icon name="shield alternate"></Icon>
            <h3>Please confirm</h3>
            <p>Are you sure you want to delete the milestone?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={cancel}>Cancel</Button>
            <Button className="primary" positive onClick={yes}>Confirm</Button>
          </Modal.Actions>
        </div>
      </Modal>
    </>
  )
}

export default PlanDelete
