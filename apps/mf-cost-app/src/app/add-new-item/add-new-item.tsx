import React, { Suspense, useState } from 'react';
import { ModalCost } from '@cudo/shared-components'
import './add-new-item.module.scss';
import { useMutation } from '@apollo/client';
import { CREATE_COST, GET_COST } from '../graphql/graphql';
import { ICosts } from '../interfaces/cost';

/* eslint-disable-next-line */
export interface AddNewItemProps { }
type User = {
  /** The user's email address */
  email: string;
  /** The user's ID */
  id: string;
}
export function AddNewItem(props: AddNewItemProps) {
  const [user, setUser] = useState<User | null>(null);
  const [val, toggle] = React.useState(false);
  const [addCost, { data }] = useMutation(CREATE_COST,
    {
      refetchQueries: [
        { query: GET_COST }
      ]
    }
  )

  const createCost = (cost) => {
    console.log('create-Cost', cost)
    cost.map(data => {
      addCost({
        variables: {
          BKPID: data.BKPID,
          BKPTitle: data.BKPTitle,
          description: data.description,
          itemPrice: Number(data.itemPrice),
          itemQuantity: Number(data.itemQuantity),
          uploadedFileID: data.uploadedFileID || '',
          uploadedFileTitle: data.uploadedFileTitle || ''
        },
        update: (
          cache,
          data
        ) => {
          const cacheData = cache.readQuery({ query: GET_COST }) as ICosts;
          cache.writeQuery({
            query: GET_COST,
            data: {
              cost: [...cacheData.costs, data['createCost']]
            }
          });
        }
      });
    })

  }
  return (
    <ModalCost house={null} createCost={createCost}></ModalCost>
  );
}

export default AddNewItem;
