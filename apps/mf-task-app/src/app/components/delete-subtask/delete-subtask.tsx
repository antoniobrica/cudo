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
        closeIcon
        size={size}
        onClose={() => setOpen(false)}
        onOpen={openf}
        open={open} className="delete-confiramtion-popup"
        closeOnDimmerClick={false}
      >
        
        <div className="delete-confirmation-con">
          <Modal.Content>
            {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
            <Icon name="shield alternate"></Icon>
            <h3>{t("common.please_confirm")}</h3>
            <p>{t("project_tab_menu.task.delete_subtask_confirm")}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={cancel}>{t("common.cancel")}</Button>
            <Button className="primary" positive onClick={yes}>{t("common.confirm")}</Button>
          </Modal.Actions>
        </div>
      </Modal>
    </>
  )
}

export default SubTaskDelete
