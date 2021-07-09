import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export interface AlertProps {
    openAlertF,
    confirm,
    costId,
    cancel
}
export const CostDelete = (props: AlertProps) => {
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        if (props.openAlertF) {
            setOpen(props.openAlertF);
        }
    }, [props.openAlertF]);
    const openf = () => {
        setOpen(true)
    }
    const yes = () => {
        cancel();
        props.confirm(props.costId)
    }
    const cancel = () => {
        setOpen(false)
        props.cancel()
    }
    const size = undefined
    return (
        <div>
            <Modal
                size={size}
                onClose={() => setOpen(false)}
                onOpen={openf}
                open={open} className="mini"
            >
                {/* <Modal.Header>Update your Task</Modal.Header> */}
                <Modal.Header>Delete Cost
                    <a className="float_right" onClick={cancel}>  <i className="ms-Icon ms-Icon--CalculatorMultiply mr-10" aria-hidden="true"></i></a>

                </Modal.Header>
                <Modal.Content>
                    <p className="text-center" style={{ color: "black" }}>Are you sure you want to delete the Cost? </p>
                </Modal.Content>
                <Modal.Actions className="float_right">
                    <Button positive onClick={yes}>
                        Yes
                    </Button>
                    <Button negative onClick={cancel}>
                        No
                    </Button>

                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default CostDelete
