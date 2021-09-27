import { useMutation } from '@apollo/client'
import { MS_SERVICE_URL } from '@cudo/mf-core'
import { ModalCost } from '@cudo/shared-components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, Form, Icon, Input, ItemContent, Label, Table } from 'semantic-ui-react'
import BkpCost from './bkp-cost'

interface BkpHierarchyLevelThreeProps {
    layerThreeBKp
    house
}

const BkpHierarchyLevelThree = (props: BkpHierarchyLevelThreeProps) => {
    const [openAddCost, setOpenAddCost] = React.useState(false)
    const [expandLayerThree, setexpandLayerThree] = useState(false)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const {t} = useTranslation()

    React.useEffect(() => {
        let costPrice = 0;
        let itemsCount = 0
        props?.layerThreeBKp?.bkpChildrenLayerTwo?.forEach(item => {
            costPrice += item.itemTotalPrice;
            itemsCount += item.itemQuantity
        })
        setTotalItems(itemsCount)
        setTotalPrice(costPrice)
    }, [props.layerThreeBKp])

    const handelAddNewCost = () => {
        setOpenAddCost(true)
    }

    const createCost = (items,hs) => {
        console.log('house------------>',hs)
        console.log('items------------>',items)    }

    const cancel = () => {
        setOpenAddCost(false)
    }

    return (
        <li>
            {
                openAddCost && <ModalCost house={props?.house} openCost={openAddCost} cancel={cancel} bkpCostFilter={props?.layerThreeBKp?.BKPID}></ModalCost>
            }
            <div className="treeview__level show" data-level="B">

                {expandLayerThree ? (
                    <Icon
                        name="minus"
                        className="hide-view"
                        onClick={() => setexpandLayerThree(!expandLayerThree)}
                    />
                ) : (
                    <Icon
                        name="add"
                        className="show-view"
                        onClick={() => setexpandLayerThree(!expandLayerThree)} />
                )}
                <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> {props?.layerThreeBKp?.BKPID} - {props?.layerThreeBKp?.BKPTitle} <span className="tv-bkp-total">( {props?.layerThreeBKp?.bkpChildrenLayerTwo?.length} BKP )</span></span>
                {expandLayerThree && (
                    <div className="treeview-cost-table">
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell >&nbsp;</Table.HeaderCell>
                                    <Table.HeaderCell >#</Table.HeaderCell>
                                    <Table.HeaderCell width='five'>BKP</Table.HeaderCell>
                                    <Table.HeaderCell width='six'>{t("project_tab_menu.cost.description")}</Table.HeaderCell>
                                    <Table.HeaderCell >{t("project_tab_menu.cost.files")}</Table.HeaderCell>
                                    <Table.HeaderCell>{t("project_tab_menu.cost.item_quantity")}</Table.HeaderCell>
                                    <Table.HeaderCell>{t("project_tab_menu.cost.item_price")}</Table.HeaderCell>
                                    <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    props?.layerThreeBKp?.bkpChildrenLayerTwo?.map(bkpCost => (
                                        <BkpCost key={bkpCost.bkpCostID} bkpCost={bkpCost} />
                                    ))
                                }
                            </Table.Body>

                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan="5">Total</Table.HeaderCell>
                                    <Table.HeaderCell>{totalItems}</Table.HeaderCell>
                                    <Table.HeaderCell colSpan="2">${totalPrice}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </div>

                )}

            </div>
            {
                expandLayerThree && (
                    <div className="add-new-block">
                        <div className="add-new-link">
                            <span onClick={handelAddNewCost}><Icon name="plus"></Icon> Add new</span>
                        </div>
                    </div>
                )
            }

        </li>
    )
}

export default BkpHierarchyLevelThree
