import React from 'react';

import './phase.module.scss';
import { GET_PHASE } from '../../graphql/graphql';
import { Form, Select } from 'semantic-ui-react';

import { usePhaseQuery } from '../../services/useRequest';
/* eslint-disable-next-line */
export interface PhaseProps {
  parentPhaseSelect
}

export function Phase(props: PhaseProps) {
  const [items, setItems] = React.useState([])
  const [phase, setPhase] = React.useState("")

  const { loading, error, data } = usePhaseQuery(GET_PHASE);
  React.useEffect(() => {
    if (data) {
      setItems(data.Phase.map(({ phaseTitle, id }) => ({ key: id, value: phaseTitle, text: phaseTitle })));

    }
  }, [data]);

  const onPhase = (event, data) => {
    const phase = { phaseID: '', phaseName: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        phase.phaseID = items[i].key;
        phase.phaseName = data.value;
      }
    }
    setPhase(data.value)
    props.parentPhaseSelect(phase)
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
