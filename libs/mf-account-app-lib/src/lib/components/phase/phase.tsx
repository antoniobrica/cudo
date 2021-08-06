import React from 'react';

import './phase.module.scss';
import { GET_PHASE } from '../../graphql/graphql';
import { Form, Select } from 'semantic-ui-react';

import { usePhaseQuery } from '../../services/useRequest';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface PhaseProps {
  parentPhaseSelect?,
  phaseName?
  error?
}

export function Phase(props: PhaseProps) {
  const [items, setItems] = React.useState([])
  const [phase, setPhase] = React.useState("")
   
  const { loading, error, data } = usePhaseQuery(GET_PHASE);
  const { t } = useTranslation()
  React.useEffect(() => {
    if (props.phaseName) {
      console.log('phaseName', props.phaseName);
      setPhase(props.phaseName);
    }
  }, [props.phaseName]);
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
      <label>{t("common.select_phase")} </label>
      <Select placeholder={t("common.select")} className="small"
        options={items}
        value={phase}
        onChange={onPhase}
        clearable
        error={props.error} 
      />
    </Form.Field>
  );
}

export default Phase;
