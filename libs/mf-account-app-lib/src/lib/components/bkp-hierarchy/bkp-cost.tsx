import { useMutation } from '@apollo/client'
import { MS_SERVICE_URL } from '@cudo/mf-core'
import { LazyLoading } from '@cudo/shared-components'
import DeleteBkpCost from 'libs/shared-components/src/lib/components/modal/deletebkpcost'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Dropdown, Form, Input, Label, Table } from 'semantic-ui-react'
import { DELETE_BKP_COST, GET_BKP_HIERARCHIES, UPDATE_BKP_COST } from '../../graphql/graphql'

interface BkpCostProps {
    bkpCost
    deleteBkp
    updateBkpCost
    deleteLoading?
    deleteData?
    updateLoading?
    updateData?

}

const BkpCost = (props: BkpCostProps) => {
    const [bkpTitle, setBkpTitle] = useState('')
    const [bkpDescription, setBkpDescription] = useState('')
    const [bkpItemQuantity, setBkpItemQuantity] = useState(null)
    const [bkpItemPrice, setBkpItemPrice] = useState(null)
    const [openEditCost, setOpenEditCost] = useState(false)
    const [openDeleteBkpCost, setOpenDeleteBkpCost] = useState(false)
    const [selectedCostID, setSelectedCostID] = useState("")
    const { t } = useTranslation()

    const location = useLocation()
    const referenceID = location?.pathname?.split('/')[3]
    // const [deleteBkp, { loading: deleteBkpLoading, error: deleteBkpError, data: deleteBkpData }] = useMutation(DELETE_BKP_COST, {
    //     refetchQueries: [
    //         { query: GET_BKP_HIERARCHIES, variables: { referenceID, referenceType: "COMPANY" } }
    //     ]
    // })

    // const [updateBkpCost, { loading: updateBkpLoading, error: updateBkpError, data: updateBkpData }] = useMutation(UPDATE_BKP_COST, {
    //     refetchQueries: [
    //         { query: GET_BKP_HIERARCHIES, variables: { referenceID, referenceType: "COMPANY" } }
    //     ]
    // })

    React.useEffect(() => {
        if (!props.updateLoading && props.updateData) {
            cancel()
        }
        // if (!updateBkpLoading && updateBkpError) {
        //     cancel()
        // }
    }, [props.updateData])

    React.useEffect(() => {
        if (props.bkpCost) {
            setBkpTitle(props.bkpCost.BKPTitle)
            setBkpDescription(props.bkpCost.description)
            setBkpItemPrice(props.bkpCost.itemPrice)
            setBkpItemQuantity(props.bkpCost.itemQuantity)
        }
    }, [props.bkpCost])
    const handleOpenEditBkp = (item) => {
        // setBkpTitle(item.BKPTitle)
        // setBkpDescription(item.description)
        // setBkpItemQuantity(item.itemQuantity)
        // setBkpItemPrice(item.itemPrice)
        setOpenEditCost(true)
    }

    const handleDeleteBKp = (id) => {
        setSelectedCostID(id)
        setOpenDeleteBkpCost(true)
    }

    const onSubmitEditBkp = (bkpCostID) => {
        props.updateBkpCost({
            variables: {
                bkpCostID,
                BKPTitle: bkpTitle,
                description: bkpDescription,
                itemPrice: bkpItemPrice,
                itemQuantity: bkpItemQuantity,
                itemTotalPrice: bkpItemPrice * bkpItemQuantity
            }
        })
    }

    const onSubmitDeleteBkp = () => {
        props.deleteBkp({
            variables: { bkpCostID: selectedCostID }
        })
    }

    const cancel = () => {
        setOpenDeleteBkpCost(false)
        setOpenEditCost(false)
    }

    return (
        openEditCost ? (
            props.updateLoading ? (<LazyLoading />) :
                <Table.Row>
                    <Table.Cell><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} alt='' /></Table.Cell>
                    <Table.Cell>{props.bkpCost.BKPID}</Table.Cell>
                    <Table.Cell>
                        <div className="edit-estimated-price" >
                            <Form.Field className="fillarea">
                                <Input placeholder={t("project_tab_menu.cost.esitmated_cost_edit_placeholder")} size='small' className="full-width "
                                    type="text"
                                    value={bkpTitle}
                                    onChange={e => setBkpTitle(e.target.value)}
                                />
                            </Form.Field>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="edit-estimated-price" >
                            <Form.Field className="fillarea">
                                <Input placeholder={t("project_tab_menu.cost.esitmated_cost_edit_placeholder")} size='small' className="full-width "
                                    type="text"
                                    value={bkpDescription}
                                    onChange={e => setBkpDescription(e.target.value)}
                                />
                            </Form.Field>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="file-attached"><i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal> 2</Label></Table.Cell>

                    <Table.Cell>
                        <div className="edit-estimated-price" >
                            <Form.Field className="fillarea">
                                <Input placeholder={t("project_tab_menu.cost.esitmated_cost_edit_placeholder")} size='small' className="full-width "
                                    type="number"
                                    value={bkpItemQuantity}
                                    onChange={e => setBkpItemQuantity(+e.target.value)}
                                />
                            </Form.Field>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="edit-estimated-price" >
                            <Form.Field className="fillarea">
                                <Input placeholder={t("project_tab_menu.cost.esitmated_cost_edit_placeholder")} size='small' className="full-width "
                                    type="number"
                                    value={bkpItemPrice}
                                    onChange={e => setBkpItemPrice(+e.target.value)}
                                />
                            </Form.Field>
                        </div>

                    </Table.Cell>
                    <Table.Cell>
                        <div className="edit-estimated-price" >
                            <Form.Field className="d-flex">
                                <button
                                    className="greenbutton anchor_complete"
                                    onClick={() => onSubmitEditBkp(props.bkpCost.bkpCostID)}
                                >
                                    <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                                </button> &nbsp;  <button className="redbutton anchor_complete" onClick={cancel}>
                                    <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                                </button>
                            </Form.Field>
                        </div>
                    </Table.Cell>
                </Table.Row>
        ) : (
            <>
                {
                    openDeleteBkpCost && <DeleteBkpCost
                        open={openDeleteBkpCost}
                        cancel={cancel}
                        deleteBkpCost={onSubmitDeleteBkp}
                        bkpCostID={selectedCostID} />
                }
                {
                    props.deleteLoading ? (<LazyLoading />)
                        :
                        <Table.Row>
                            <Table.Cell><
                                img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} alt='' />
                            </Table.Cell>
                            <Table.Cell>{props.bkpCost.BKPID}</Table.Cell>
                            <Table.Cell>{props.bkpCost.BKPTitle}</Table.Cell>
                            <Table.Cell>{props.bkpCost.description}</Table.Cell>
                            <Table.Cell className="file-attached">
                                <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>
                                <Label horizontal>{props.bkpCost.bkpCostFiles?.length}</Label>
                            </Table.Cell>
                            <Table.Cell>{props.bkpCost.itemQuantity}</Table.Cell>
                            <Table.Cell>${props.bkpCost.itemPrice}</Table.Cell>
                            <Table.Cell>
                                <Dropdown icon='ellipsis horizontal' pointing='right'>
                                    <Dropdown.Menu className="dropdowncomplete">
                                        <Dropdown.Item
                                            icon='pencil'
                                            text={t("common.edit")}
                                            onClick={() => handleOpenEditBkp(props.bkpCost)}
                                        />
                                        <Dropdown.Item
                                            icon='trash alternate outline'
                                            text={t("common.delete")}
                                            onClick={() => handleDeleteBKp(props.bkpCost.bkpCostID)}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.Cell>
                        </Table.Row>
                }
            </>
        )
    )


}


export default BkpCost
