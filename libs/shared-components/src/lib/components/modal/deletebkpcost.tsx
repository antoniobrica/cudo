import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Modal } from 'semantic-ui-react'
// open={openDeleteCost} cancel={cancel} deleteBkpCost={deleteBkpCost}

interface DeleteBkpCostProps {
    open?
    cancel
    deleteBkpCost?
    bkpCostID?
}
const DeleteBkpCost = (props: DeleteBkpCostProps) => {
    const [open, setOpen] = React.useState(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        if (props.open) {
            setOpen(props.open);
        }
    }, [props.open]);

    const onClickOpenDeleteInvitation = () => {
        setOpen(true)
    }
    const yes = () => {
        setOpen(false)
        props.deleteBkpCost(props.bkpCostID)
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
            onOpen={onClickOpenDeleteInvitation}
            open={open}
            className="delete-confiramtion-popup"
            closeOnDimmerClick={false}
        >
            <div className="delete-confirmation-con">
                <Modal.Content>
                    {/* <i className="ms-Icon ms-Icon--ShieldAlert" aria-hidden="true"></i> */}
                    <Icon name="shield alternate"></Icon>
                    <h3>{t("common.please_confirm")}</h3>
                    <p>{t("project_tab_menu.meeting.invitation_are_you_sure")}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic onClick={cancel}>{t("common.cancel")}</Button>
                    <Button className="primary" positive onClick={yes}>{t("common.confirm")}</Button>
                </Modal.Actions>
            </div>
        </Modal>
    )
}

export default DeleteBkpCost
