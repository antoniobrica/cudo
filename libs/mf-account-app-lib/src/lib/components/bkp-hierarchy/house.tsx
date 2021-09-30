import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Form, Icon, Input } from 'semantic-ui-react'
import BkpHierarchyLevelTwo from './bkp-hierarchy-level-two';

interface HouseProps {
    house?
    bkpData?
    deleteBkp
    updateBkpCost
    addBkpCosts
    data?
    loading?
    addLoading?
    addData?
    deleteLoading?
    deleteData?
    updateLoading?
    updateData?
}

const House = (props: HouseProps) => {
    const [expandFirstLayer, setExpandFirstLayer] = useState(false)
    const [totalCost, setTotalCost] = useState(0);
    const [seletedBkpData, setSeletedBkpData] = useState([])
    const { t } = useTranslation()

    // select bkps related to house data
    React.useEffect(() => {
        const selectedBkps = props?.bkpData?.getBkps?.map(bkp => {
            if (bkp.structureID === props.house.structureID) {
                return bkp
            }
        })
        setSeletedBkpData(selectedBkps)
    }, [props.bkpData])

    React.useEffect(() => {
        let totalStructureCost = 0
        seletedBkpData?.forEach(item => {
            item?.children?.forEach(levelTwoItem => {
                levelTwoItem?.bkpChildrenLayerTwo?.forEach(levelThreeItem => {
                    totalStructureCost += levelThreeItem.itemTotalPrice
                })
            })
        })
        setTotalCost(totalStructureCost)
    }, [seletedBkpData])

    return (
        <li>
            <div className="treeview__level show" data-level="A">
                <Icon
                    name="add"
                    className="show-view"
                    onClick={() => setExpandFirstLayer(!expandFirstLayer)}
                />
                {expandFirstLayer && (
                    <Icon
                        name="minus"
                        className="hide-view"
                        onClick={() => setExpandFirstLayer(!expandFirstLayer)}
                    />
                )}
                <span className="level-title cost-item-parent"><Icon name="list" /> {props.house.structureName} <span className="item-total-price">{t("project_tab_menu.cost.total_price")}: ${totalCost}</span></span>
            </div>

            {/* first bkp layer */}
            {expandFirstLayer && (
                <ul>
                    {seletedBkpData && seletedBkpData.map((layerTwoBkp) => (
                        layerTwoBkp && <BkpHierarchyLevelTwo
                            key={layerTwoBkp.bkpCostID}
                            layerTwoBkp={layerTwoBkp}
                            deleteBkp={props.deleteBkp}
                            updateBkpCost={props.updateBkpCost}
                            addBkpCosts={props.addBkpCosts}
                            loading={props.loading}
                            data={props.data}
                            addLoading={props.addLoading}
                            addData={props.addData}
                            deleteLoading={props.deleteLoading}
                            deleteData={props.deleteData}
                            updateLoading={props.updateLoading}
                            updateData={props.updateData}
                        />
                    ))}

                </ul>
            )}
        </li>
    )
}

export default House
