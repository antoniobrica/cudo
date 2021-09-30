import { BkpsIndex, HouseStructureIndex } from '@cudo/mf-account-app-lib'
import { MS_SERVICE_URL } from '@cudo/mf-core'
import { FileListIndex } from '@cudo/mf-document-lib'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Button, Form, Header, Icon, Input, Label, Modal, Segment, Table } from 'semantic-ui-react'

export interface AddBkpCostPopUpProps {
    house?
    openCost?
    cancel?
    addBkpCosts?
    bkpCostFilter
    addLoading?
    addData?
}

type IFile = {
    uploadedFileID?: string;
    uploadedFileTitle?: string;
}

type IItem = {
    index?: number,
    BKPTitle?: string,
    BKPID?: string,
    description?: string;
    files?: IFile[];
    itemQuantity?: number;
    itemPrice?: number;
}

const AddBkpCostPopUp = (props: AddBkpCostPopUpProps) => {
    const [open, setOpen] = useState(false)
    const [houseStructure, setHouseStructure] = useState("")
    const [bkpCostItems, setBkpCostItems] = useState<IItem[]>([{}])

    const location = useLocation()
    const referenceID = location?.pathname?.split('/')[3]

    const { t } = useTranslation()

    React.useEffect(() => {
        if (props.openCost) {
            setOpen(true);
        }
    }, [props.openCost])

    const onChangeSetItemData = (data, index: number) => {
        const items: IItem[] = [...bkpCostItems]
        items[index] = data
        setBkpCostItems(items)
    }
    console.log('fffffffffffffffff', bkpCostItems)

    // add empty bkp cost item to list
    function addItem() {
        setBkpCostItems([...bkpCostItems, {
        } as IItem])
    }

    function removeItem(index) {
        const values = [...bkpCostItems];
        values.splice(index, 1);
        setBkpCostItems(values);
    }

    const house = (data) => {
        setHouseStructure(data)
    }

    const createCostData = (items, hs) => {
        const selectedItems = items?.map(item => {
            return { ...item, itemQuantity: +item.itemQuantity, itemPrice: +item.itemPrice, itemTotalPrice: item.itemPrice * item.itemQuantity }
        })
        const addLayerTwoBkpHierarchy = { structureID: hs.structureID, childrenLayerTwo: selectedItems }

        const variables = {
            referenceID,
            referenceType: "PROJECTTYPE",
            addLayerTwoBkpHierarchy
        }

        props.addBkpCosts({
            variables
        })
        cancel()
    }

    const createCost = () => {
        // if (isApi) {
        //   console.log('isApi', isApi)
        //   props.createCost(items)
        //   cancel();
        // }
        // setLoading(true)
        const hs = houseStructure;
        if (props.house) {
            createCostData(bkpCostItems, props.house)
        } else {
            createCostData(bkpCostItems, hs)
        }
        // setOpen(false);
        // cancel();
    }

    const cancel = () => {
        setOpen(false)
        props.cancel()
    }
    return (
        <div style={{ marginLeft: 920 }}>
            <Modal className="modal_media add-new-work  right-side--fixed-modal add-new-cost-modal"
                closeIcon
                onClose={cancel}
                onOpen={() => setOpen(true)}
                open={open}
                // trigger={<Button size='mini' className="grey-btn">+ {t('add_cost.add_new')} </Button>}
                closeOnDimmerClick={false}
            >


                <Modal.Header><h3>{t('project_tab_menu.cost.add_new_item')} </h3></Modal.Header>
                <Modal.Content body>
                    <div>
                        <Modal.Header className="cost-modal-header">
                            <h3 className="">{t('project_tab_menu.cost.select_house')} <span>({t('project_tab_menu.cost.this_house_contain')})</span></h3>
                            {
                                props?.house ? (
                                    <Form.Field>
                                        <Segment>
                                            <Input
                                                value={props?.house?.structureName}
                                            // searchInput={{ autoFocus: true }}
                                            />
                                        </Segment>
                                    </Form.Field>
                                ) : (
                                    <HouseStructureIndex house={house}></HouseStructureIndex>
                                )
                            }
                        </Modal.Header>
                        <div className="cost-modal-content">
                            <Header className="header" >{t('project_tab_menu.cost.items')}</Header>

                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell># </Table.HeaderCell>
                                        <Table.HeaderCell width={4}>{t('common.bkp')}</Table.HeaderCell>
                                        <Table.HeaderCell width={6}>{t('common.desc')}</Table.HeaderCell>
                                        <Table.HeaderCell>Files</Table.HeaderCell>
                                        <Table.HeaderCell width={1}>{t('project_tab_menu.cost.item_quality')}</Table.HeaderCell>
                                        <Table.HeaderCell width={1}>{t('project_tab_menu.cost.item_price')}</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        bkpCostItems.map((item, index) => (
                                            <CostItem
                                                removeItem={removeItem} onChangeSetItemData={onChangeSetItemData} index={index}
                                                bkpCostFilter={props.bkpCostFilter}
                                            />
                                        )
                                        )
                                    }
                                </Table.Body>
                            </Table>

                            <div className="add-more-cost"><a onClick={() => addItem()}><Icon name='add' /> {t("common.add_more")} </a></div>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content={t("common.submit")}
                        onClick={createCost}
                        positive
                        size='small' className="primary"
                    />
                    <Button
                        size='small'
                        className="icon-border"
                        onClick={cancel}
                    >
                        X  {t("common.cancel")}
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

// componet for bkp cost item
interface CostItemProps {
    index
    onChangeSetItemData
    removeItem
    bkpCostFilter
}

const CostItem = (props: CostItemProps) => {
    const [description, setDescription] = useState("")
    const [isOpenTaskFiles, setisOpenTaskFiles] = useState(false)
    const [files, setFileList] = React.useState([]);
    const [selectedFiles, setSelectedFiles] = useState([])
    const [itemQuantity, setItemQuantity] = useState()
    const [itemPrice, setItemPrice] = useState()
    const [item, setItem] = useState<IItem>({ files: [] }) // if files not selected sending empty object

    const onBkpChange = (bkp) => {
        setItem(pval => {
            return { ...pval, BKPID: bkp.BKPID, BKPTitle: bkp.BKPIDTitle }
        })
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
        setItem(pval => {
            return { ...pval, description: e.target.value }
        })
    }

    const onItemQuantityChange = (e) => {
        setItemQuantity(e.target.value)
        setItem(pval => {
            return { ...pval, itemQuantity: +e.target.value }
        })
    }

    const onItemPriceChange = (e) => {
        setItemPrice(e.target.value)
        setItem(pval => {
            return { ...pval, itemPrice: +e.target.value }
        })
    }

    const addSelectedFiles = (data) => {
        setSelectedFiles(data)
        const seletedFilesData = []
        data.map(file => {
            seletedFilesData.push({ uploadedFileID: file.uploadedFileID, uploadedFileTitle: file.fileTitle })
        })
        setFileList(seletedFilesData)
        setItem(pval => {
            return { ...pval, files: seletedFilesData }
        })
    }

    // const removeSeletedFile = (file) => {
    //     const newSelectedFiles = selectedFiles.filter(item => item.fileURL !== file.fileURL)
    //     setSelectedFiles(newSelectedFiles)
    //     setFileList(newSelectedFiles)
    // }

    React.useEffect(() => {
        props.onChangeSetItemData(item, props.index)
    }, [item])

    const cancelIsTaskFileOpen = () => {
        setisOpenTaskFiles(false)
    }

    return (
        <>
            {
                isOpenTaskFiles && (
                    <FileListIndex
                        isTaskFile={isOpenTaskFiles}
                        cancel={cancelIsTaskFileOpen}
                        onlyAddFileToTask={true} // set true to open select file if set false it will open add pin to file
                        selectedFiles={selectedFiles}
                        addSelectedFiles={addSelectedFiles}
                    />
                )
            }
            <Table.Row >
                <Table.Cell className="row-icon">
                    <span> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} alt='' />  </span>
                </Table.Cell>
                <Table.Cell collapsing className="row-number">
                    {props.index + 1 || 0}
                </Table.Cell>
                <Table.Cell className="cost-bkp-field">
                    <BkpsIndex bkpCostFilter={props.bkpCostFilter} bkp={''} parentBKPSelect={onBkpChange} ></BkpsIndex>
                </Table.Cell>
                <Table.Cell>
                    <Input name='description' size='small' className="full-width" onChange={onDescriptionChange} value={description} />
                </Table.Cell>
                <Table.Cell collapsing className="cost-files">
                    <span onClick={() => setisOpenTaskFiles(true)} className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal>{files.length}</Label>  </span>
                </Table.Cell>
                <Table.Cell className="width100">
                    <Input
                        name='itemQuantity'
                        placeholder="0"
                        type='number'
                        size='small'
                        className="full-width"
                        onChange={onItemQuantityChange}
                        value={itemQuantity}
                    />
                </Table.Cell>
                <Table.Cell className="width100">
                    <Input
                        type='number'
                        placeholder="0"
                        name='itemPrice'
                        size='small'
                        className="full-width"
                        onChange={onItemPriceChange}
                        value={itemPrice} />

                </Table.Cell>
                <Table.Cell collapsing>
                    <a onClick={() => props.removeItem(props.index)} className="cost-remove-row"><i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i></a>
                </Table.Cell>
            </Table.Row>
        </>
    )
}


export default AddBkpCostPopUp
