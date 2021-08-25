import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'semantic-ui-react'

export interface DeleteSessionProps {
  sessionId,
  deleteSession,
  openDeleteSession,
  cancel,
  getSessionErrorMessage?
  getSessionToasterMessage?
}

export const ModalDeleteSession = (props: DeleteSessionProps) => {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()
  React.useEffect(() => {
    if (props.openDeleteSession) {
      setOpen(props.openDeleteSession);
    }
  }, [props.openDeleteSession]);

  // React.useEffect(() => {
  //   if (!props.loading && props.data) {
  //     cancel()
  //   }
  // }, [props.loading])

  const onClickOpenDeleteSession = () => {
    setOpen(true)
  }
  const yes = () => {
    props.deleteSession(props.sessionId)
    cancel()
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }
  const size = undefined
  return (

    <Modal
      closeIcon
      size={size}
      onClose={cancel}
      onOpen={onClickOpenDeleteSession}
      open={open}
      className="delete-confiramtion-popup"
      closeOnDimmerClick={false}
    >
      <div className="delete-confirmation-con">
        <Modal.Content>
          {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
          <Icon name="shield alternate"></Icon>
          <h3>{t("common.please_confirm")}</h3>
          <p>{t("project_tab_menu.meeting.session_are_you_sure")}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={cancel}>{t("common.cancel")}</Button>
          <Button className="primary" positive onClick={yes}>{t("common.confirm")}</Button>
        </Modal.Actions>
      </div>
    </Modal>
  )
}

export default ModalDeleteSession
