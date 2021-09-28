import React from 'react'
import { Icon } from 'semantic-ui-react'
import BkpHierarchyLevelThree from './bkp-hierarchy-level-three'

interface BkpHierarchyLevelTwoProps {
    layerTwoBkp
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
const BkpHierarchyLevelTwo = (props: BkpHierarchyLevelTwoProps) => {
    const [expandLavelThree, setExpandLavelThree] = React.useState(false)
    const [house, setHouse] = React.useState({})

    React.useEffect(() => {
        setHouse({ structureID: props?.layerTwoBkp?.structureID, structureName: props?.layerTwoBkp?.structureName })
    }, [props.layerTwoBkp])

    return (
        <li>
            <div className="treeview__level show" data-level="B">

                {
                    expandLavelThree ? (
                        <Icon
                            name="minus"
                            className="hide-view"
                            onClick={() => setExpandLavelThree(!expandLavelThree)}
                        />
                    ) : (
                        <Icon
                            name="add"
                            className="show-view"
                            onClick={() => setExpandLavelThree(!expandLavelThree)}
                        />
                    )
                }
                <span className="level-title">
                    <Icon
                        name="level up alternate"
                        className="rotate-level-icon"
                    />
                    {props?.layerTwoBkp?.BKPID} - {props?.layerTwoBkp?.BKPTitle}
                </span>
            </div>
            {
                expandLavelThree && (
                    <ul>
                        {
                            props?.layerTwoBkp?.children?.map(layerThreeBKp => (
                                layerThreeBKp ? (
                                    <BkpHierarchyLevelThree
                                        key={layerThreeBKp.bkpCostID}
                                        layerThreeBKp={layerThreeBKp}
                                        house={house}
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
                                ) : (
                                    <p>No Data</p>
                                )
                            ))
                        }
                    </ul>
                )
            }
        </li>
    )
}

export default BkpHierarchyLevelTwo
