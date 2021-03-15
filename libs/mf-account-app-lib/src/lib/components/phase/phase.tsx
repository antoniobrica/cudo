import React from 'react';

import './phase.module.scss';
import { GET_PHASE } from '../../graphql/graphql';
import {  Form,  Select } from 'semantic-ui-react';

import {  usePhaseQuery } from '../../services/useRequest';
/* eslint-disable-next-line */
export interface PhaseProps {
  parentPhaseSelect
}

export function Phase(props: PhaseProps) {
  const [items, setItems] = React.useState([])
  const [phase, setPhase] = React.useState("")

  const { loading, error, data } = usePhaseQuery(GET_PHASE);
  React.useEffect(() => {
    if(data){
      console.log('bkp==>',data)
     setItems(data.Phase.map(({phaseTitle }) => ({ key: phaseTitle, value: phaseTitle, text: phaseTitle })));

    }
  }, [data]);

  const onPhase = (event, data) => {
    setPhase(data.value)
    props.parentPhaseSelect(data)
   }
  return (
    <Form.Field>
    <label>Select Phase   </label>
  <Select placeholder='Select' className="small" 
  options={items}
  value={phase}
  onChange={onPhase}
  />
  
</Form.Field>
  );
}

export default Phase;
