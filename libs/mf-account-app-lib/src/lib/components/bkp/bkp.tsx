import React from 'react';
import { GET_BKP } from '../../graphql/graphql';
import {  Form,  Select } from 'semantic-ui-react';

import { useBkpQuery } from '../../services/useRequest';

import './bkp.module.scss';

/* eslint-disable-next-line */
export interface BkpProps {}

export function Bkp(props: BkpProps) {
  const [items, setItems] = React.useState([])
  const [BKPID, setBKPID] = React.useState("")

  const { loading, error, data } = useBkpQuery(GET_BKP);
  React.useEffect(() => {
    if(data){
      console.log('bkp==>',data)
     setItems(data.Bkp.map(({bkpTitle }) => ({ key: bkpTitle, value: bkpTitle, text: bkpTitle })));

    }
  }, [data]);

  const onBkp = (event, data) => {
    setBKPID(data.value)
   }

  return (
    <Form.Field>
      <label>Select BKP   </label>
    <Select placeholder='Select' className="small" 
    options={items}
    value={BKPID}
    onChange={onBkp}
    />
    
  </Form.Field>
  );
}

export default Bkp;
