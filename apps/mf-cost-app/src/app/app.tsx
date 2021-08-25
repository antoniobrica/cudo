import { initI18n, changeLanguage } from '@cudo/mf-core';
import { CostList } from '@cudo/shared-components';
import React, { Suspense, useEffect, useState } from 'react';

import { Button } from 'semantic-ui-react';
import AddNewItem from './add-new-item/add-new-item';
import { DELETE_COST, EDIT_COST, GET_COST } from './graphql/graphql';
import { useCostQuery } from './services/useRequest';
import { LoaderPage } from "@cudo/shared-components"
import CostDelete from './delete-cost';
import { useMutation } from '@apollo/client';
import { ICosts } from './interfaces/cost';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

export function App() {
  const [openCost, setOpenCost] = React.useState(false)
  const [openCostDelete, setOpenCostDelete] = React.useState(false)
  const [loadingOnDeleteCost, setLoadingOnDeleteCost] = React.useState(false)
  const [activeErrorClass, setActiveErrorClass] = React.useState(false)

  const [costId, setCostId] = React.useState('')
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  const [costDelete, { loading: deleteCostLoading, data: deleteCostData, error: deleteCostError }] = useMutation(DELETE_COST,
    {
      refetchQueries: [
        { query: GET_COST, variables: { referenceID } }
      ]
    }
  )

  const [editbkpCost, { loading: editCostLoading, data: updatedCostData }] = useMutation(EDIT_COST,
    {
      refetchQueries: [
        { query: GET_COST, variables: { referenceID } }
      ]
    }
  )

  const { loading, error, data } = useCostQuery(GET_COST, {
    variables: { referenceID },
  });

  // if (error) {
  //   const cancel = () => {
  //     setOpenCost(false)
  //   }
  //   return (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <div>
  //         <AddNewItem openCost={openCost} cancel={cancel}></AddNewItem>
  //       </div>
  //     </Suspense>
  //   )
  // }

  // set toaster for delete task

  const getTaskToasterMessage = (data) => {
    setActiveErrorClass(false)
    toast(data)
  }

  const addNew = () => {
    console.log('add new')
    setOpenCost(true);
  }

  const cancel = () => {
    setOpenCost(false)
  }

  const deleteCost = (data) => {
    setOpenCostDelete(true)
    setCostId(data)
  }
  const closeDelete = (data) => {
    setOpenCostDelete(false)
  }

  const updateBkpCost = (data) => {
    console.log('edit', data)
    editbkpCost({
      variables: {
        BKPID: data.BKPID,
        bkpCostID: data.bkpCostID,
        BKPTitle: data.BKPTitle,
        description: data.description,
        itemPrice: Number(data.itemPrice),
        itemQuantity: Number(data.itemQuantity),
      },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_COST, variables: { referenceID } }) as ICosts;
        cache.writeQuery({
          query: GET_COST,
          data: {
            cost: [...cacheData.costs, data['editbkpCost']]
          }
        });
      }
    })
  }
  // set toaster for delete 
  useEffect(() => {
    if (!deleteCostLoading && deleteCostData) {
      setLoadingOnDeleteCost(false)
      getTaskToasterMessage("toaster.success.task.task_edit")

    }
    if (!deleteCostLoading && deleteCostError) {
      setLoadingOnDeleteCost(false)
      getTaskToasterMessage("toaster.success.task.task_edit")

    }
  }, [deleteCostLoading])

  const confirmDeleteCost = (data) => {
    setLoadingOnDeleteCost(true)
    console.log('data', data)
    costDelete({
      variables: {
        costID: data
      },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_COST, variables: { referenceID } }) as ICosts;
        cache.writeQuery({
          query: GET_COST,
          data: {
            cost: [...cacheData.costs, data['createCost']]
          }
        });
      }
    });
  }

  if (loading) {
    return <LoaderPage />
  }


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <ToastContainer className={`${activeErrorClass ? "error" : "success"}`} position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />
        <div>
          <AddNewItem openCost={openCost} cancel={cancel}></AddNewItem>
        </div>
        {editCostLoading && <LoaderPage />}
        {openCostDelete && <CostDelete costId={costId} openAlertF={openCostDelete} cancel={closeDelete} confirm={confirmDeleteCost} />}
        <CostList addNew={addNew} costs={data?.costs} delete={deleteCost} updateBkpCost={updateBkpCost}></CostList>
        {/* <Button onClick={() => changeLanguage('en-GB')}>EN</Button>
        <Button onClick={() => changeLanguage('de-DE')}>DE</Button> */}
      </div>
    </Suspense>
  );
}

export default App;
