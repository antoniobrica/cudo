import { LazyLoading } from '@cudo/shared-components'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'semantic-ui-react'

export interface AlertProps {
  openAlert?
  fileData?
  confirm?
  cancel?
}
export const DeleteFileConfirm = (props: AlertProps) => {
  const [open, setOpen] = React.useState(false)

  const { t } = useTranslation()
  React.useEffect(() => {
    if (props.openAlert) {
      setOpen(props.openAlert);
    }
  }, [props.openAlert]);


  const openf = () => {
    setOpen(true)
  }
  const yes = () => {
    setOpen(false)
    props.confirm(true, props.fileData)
  }
  const cancel = () => {
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
            <Icon name="shield alternate"></Icon>
            <h3>{t("common.please_confirm")}</h3>
            <p>{t("project_tab_menu.files.delete_file_confirm")}</p>
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

export default DeleteFileConfirm
