import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'semantic-ui-react'

  export interface AlertProps {
    openAlertF,
    confirm,
    planData,
    cancel,
  }
  export const PlanDelete = (props: AlertProps) => {
  const [open, setOpen] = React.useState(false)
  const {t} = useTranslation()
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

      <Modal
        closeIcon
        size={size}
        onClose={cancel}
        onOpen={openf}
        open={open} 
        className="delete-confiramtion-popup"
        closeOnDimmerClick={false}
      >
        <div className="delete-confirmation-con">
          <Modal.Content>
            {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
            <Icon name="shield alternate"></Icon>
            <h3>{t("common.please_confirm")}</h3>
            <p>{t("project_tab_menu.planning.are_you_sure")}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={cancel}>{t("common.cancel")}</Button>
            <Button className="primary" positive onClick={yes}>{t("common.confirm")}</Button>
          </Modal.Actions>
        </div>
      </Modal>
  )
}

export default PlanDelete
