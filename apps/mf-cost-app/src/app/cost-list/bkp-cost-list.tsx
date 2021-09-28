import { useMutation, useQuery } from '@apollo/client'
import { BkpHierarchyIndex } from '@cudo/mf-account-app-lib'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { CREATE_BKP_COSTS, DELETE_BKP_COST, GET_BKP_HIERARCHIES, UPDATE_BKP_COST } from '../graphql/graphql'

const BkpCostList = () => {

    const location = useLocation()
    const referenceID = location?.pathname?.split('/')[3]
    // load bkp hierarchies 
    const { loading, error, data } = useQuery(GET_BKP_HIERARCHIES, {
        variables: { referenceID, referenceType: "PROJECTTYPE" } // ref type is project but need to keep company because getting data from DB only for company ref
    })

    // create bkp costs
    const [addBkpCosts, { loading: addBkpLoading, error: addBkpError, data: addBkpData }] = useMutation(CREATE_BKP_COSTS, {
        refetchQueries: [
            { query: GET_BKP_HIERARCHIES, variables: { referenceID, referenceType: "PROJECTTYPE" } }
        ]
    }
    )

    const [deleteBkp, { loading: deleteBkpLoading, error: deleteBkpError, data: deleteBkpData }] = useMutation(DELETE_BKP_COST, {
        refetchQueries: [
            { query: GET_BKP_HIERARCHIES, variables: { referenceID, referenceType: "PROJECTTYPE" } }
        ]
    })

    const [updateBkpCost, { loading: updateBkpLoading, error: updateBkpError, data: updateBkpData }] = useMutation(UPDATE_BKP_COST, {
        refetchQueries: [
            { query: GET_BKP_HIERARCHIES, variables: { referenceID, referenceType: "PROJECTTYPE" } }
        ]
    })

    return (
        <BkpHierarchyIndex
            data={data}
            addBkpCosts={addBkpCosts}
            deleteBkp={deleteBkp}
            updateBkpCost={updateBkpCost}
            addLoading={addBkpLoading}
            addData = {addBkpData}
            deleteLoading={deleteBkpLoading}
            deleteData={deleteBkpData}
            updateLoading={updateBkpLoading}
            updateData={updateBkpData}
        />
    )
}

export default BkpCostList
