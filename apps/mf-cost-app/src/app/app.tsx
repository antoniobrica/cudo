import { initI18n, changeLanguage } from '@cudo/mf-core';
import { CostList } from '@cudo/shared-components';
import React, { Suspense } from 'react';
import { Button } from 'semantic-ui-react';
import AddNewItem from './add-new-item/add-new-item';
import { DELETE_COST, EDIT_COST, GET_COST } from './graphql/graphql';
import { useCostQuery } from './services/useRequest';
import { LoaderPage } from "@cudo/shared-components"
import CostDelete from './delete-cost';
import { useMutation } from '@apollo/client';
import { ICosts } from './interfaces/cost';
import { useHistory } from 'react-router-dom';

const defaultLanguage = 'de-DE';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

export function App() {
  const [openCost, setOpenCost] = React.useState(false)
  const [openCostDelete, setOpenCostDelete] = React.useState(false)
  const [costId, setCostId] = React.useState('')
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3].toString();
  const [costDelete, { data: deleteCostData }] = useMutation(DELETE_COST,
    {
      refetchQueries: [
        { query: GET_COST, variables: { referenceID } }
      ]
    }
  )

  const [editbkpCost, { data: updatedCostData }] = useMutation(EDIT_COST,
    {
      refetchQueries: [
        { query: GET_COST, variables: { referenceID } }
      ]
    }
  )

  const { loading, error, data } = useCostQuery(GET_COST, {
    variables: { referenceID },
  });
  if (loading) {
    return <LoaderPage />
  }

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


  const confirmDeleteCost = (data) => {
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div>
          <AddNewItem openCost={openCost} cancel={cancel}></AddNewItem>
        </div>
        {openCostDelete && <CostDelete costId={costId} openAlertF={openCostDelete} cancel={closeDelete} confirm={confirmDeleteCost} />}
        <CostList addNew={addNew} costs={data?.costs} delete={deleteCost} updateBkpCost={updateBkpCost}></CostList>
        {/* <Button onClick={() => changeLanguage('en-GB')}>EN</Button>
        <Button onClick={() => changeLanguage('de-DE')}>DE</Button> */}
      </div>
    </Suspense>
  );
}

export default App;
