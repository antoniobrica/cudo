import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'semantic-ui-react'

  export interface SubTaskDeleteProps {
    openAlertSTDF,
    confirmSubTaskDelete,
    cancelSubTaskDelete,
    taskId?,
    subTaskId
  }
  export const SubTaskDelete = (props: SubTaskDeleteProps) => {
  const [open, setOpen] = React.useState(false)
  const {t} = useTranslation()
  React.useEffect(() => {
    if (props.openAlertSTDF) {
      setOpen(props.openAlertSTDF);
    }
  }, [props.openAlertSTDF]);
  const openf = () => {
    setOpen(true)
  }
  const yes =()=>{
    setOpen(false)
    props.confirmSubTaskDelete(props.taskId, props.subTaskId)
  }
  const cancel =()=>{
    setOpen(false)
    props.cancelSubTaskDelete()
  }
const size = undefined
  return (
    <>

      <Modal
        size={size}
        onClose={() => setOpen(false)}
        onOpen={openf}
        open={open} className="mini"
        closeOnDimmerClick={false}
      >
        
        <Modal.Header>{t("project_tab_menu.task.delete_subtask")} 
        <a className="float_right" onClick={cancel}>  <i className="ms-Icon ms-Icon--CalculatorMultiply mr-10" aria-hidden="true"></i></a> 
          
          </Modal.Header>
        <Modal.Content>
          <p className="text-center" style={{color: "black"}}>{t("project_tab_menu.task.delete_subtask_confirm")} </p>
        </Modal.Content>
        <Modal.Actions className="float_right">
        <Button positive onClick={yes}>
            {t("common.yes")}
          </Button>
          <Button negative  onClick={cancel}>
          {t("common.no")}
          </Button>
       
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default SubTaskDelete
