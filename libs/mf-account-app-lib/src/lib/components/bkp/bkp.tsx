import React from 'react';
import { GET_BKP } from '../../graphql/graphql';
import { Form, Select } from 'semantic-ui-react';

import { useBkpQuery } from '../../services/useRequest';

import './bkp.module.scss';

/* eslint-disable-next-line */
export interface BkpProps {
  parentBKPSelect
}

export function Bkp(props: BkpProps) {
  const [items, setItems] = React.useState([])
  const [BKPID, setBKPID] = React.useState("")

  const { loading, error, data } = useBkpQuery(GET_BKP);
  React.useEffect(() => {
    if (data) {
      setItems(data.Bkp.map(({ bkpTitle, bkpID }) => ({ key: bkpID, value: bkpTitle, text: bkpID + " - "+ bkpTitle })));

    }
  }, [data]);

  const onBkp = (event, data) => {

    const bkpID = { BKPID: '', BKPIDTitle: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        bkpID.BKPID = items[i].key;
        bkpID.BKPIDTitle = data.value;
      }
    }
    setBKPID(data.value)
    props.parentBKPSelect(bkpID);
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
