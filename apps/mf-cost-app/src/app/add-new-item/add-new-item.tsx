import React, { Suspense, useState } from 'react';
import { ModalCost } from '@cudo/shared-components'
import './add-new-item.module.scss';

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
  return (
    <ModalCost house={null} ></ModalCost>
  );
}

export default AddNewItem;
