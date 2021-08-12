import { LazyLoading } from '@cudo/shared-components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'semantic-ui-react'

export interface AlertProps {
  openAlertF,
  confirm,
  taskData,
  cancel,
  taskStatus,
  isStopTaskDeleteLoader?
}
export const TaskDelete = (props: AlertProps) => {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()
  React.useEffect(() => {
    if (props.openAlertF) {
      setOpen(props.openAlertF);
    }
  }, [props.openAlertF]);

  useEffect(() => {
    if (props.isStopTaskDeleteLoader) {
      console.log('----useEffect-is loading false set here---')
      setIsLoading(false)
      setOpen(false)
    }
  }, [props.isStopTaskDeleteLoader])
  const openf = () => {
    setOpen(true)
  }
  const yes = () => {
    // setOpen(false)
    console.log('----After confirm-is loading true set here---')
    setIsLoading(true)
    props.confirm(true, props.taskData)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }
  const size = undefined

  if (isLoading)
    return (<LazyLoading />)

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
        {/* <Modal.Header>Update your Task</Modal.Header>
        <Modal.Header>{t("project_tab_menu.task.delete_task")} 
        <a className="float_right" onClick={cancel}>  <i className="ms-Icon ms-Icon--CalculatorMultiply mr-10" aria-hidden="true"></i></a> 
          
          </Modal.Header>
        <Modal.Content>
          <p className="text-center" style={{color: "black"}}>{t("project_tab_menu.task.delete_task_confirm")} </p>
        </Modal.Content>
        <Modal.Actions className="float_right">
        <Button positive onClick={yes}>
            {t("common.yes")}
          </Button>
          <Button negative  onClick={cancel}>
            {t("common.no")}
          </Button>
       
        </Modal.Actions>
      </Modal> */}
        <div className="delete-confirmation-con">
          <Modal.Content>
            {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
            <Icon name="shield alternate"></Icon>
            <h3>{t("common.please_confirm")}</h3>
            <p>{t("project_tab_menu.task.delete_task_confirm")}</p>
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

export default TaskDelete
