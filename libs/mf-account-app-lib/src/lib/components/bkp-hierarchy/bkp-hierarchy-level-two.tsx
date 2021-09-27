import React from 'react'
import { Icon } from 'semantic-ui-react'
import BkpHierarchyLevelThree from './bkp-hierarchy-level-three'

interface BkpHierarchyLevelTwoProps {
    layerTwoBkp
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
                                        key={layerThreeBKp.bkpCostID} layerThreeBKp={layerThreeBKp}
                                        house={house}
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
