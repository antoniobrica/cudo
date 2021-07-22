import React from 'react';

import './session-protocol.module.scss';
import {
  Form,
  Select
} from 'semantic-ui-react';
import { useProtocolQuery } from '../../services/useRequest';
import { GET_CATAGORIES, GET_PROTOCOL } from '../../graphql/graphql';
/* eslint-disable-next-line */
export interface SessionProtocolProps {
  parentSessionSelect
}

export function SessionProtocol(props: SessionProtocolProps) {
  const [items, setItems] = React.useState([])
  const [protocol, setProtocol] = React.useState("")


  const { loading, error, data } = useProtocolQuery(GET_PROTOCOL);
  React.useEffect(() => {
    if (data) {
      setItems(data.ProtocoleTemplates.map(({ protocolTemplateID, protocolTemplateTitle }) => ({ key: protocolTemplateID, value: protocolTemplateTitle, text: protocolTemplateTitle })));

    }
  }, [data]);

  const onCatogory = (event, data) => {
    const protocol = { protocolTemplateID: '', protocolTemplateTitle: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        protocol.protocolTemplateID = items[i].key;
        protocol.protocolTemplateTitle = data.value;
      }
    }
    setProtocol(data.value)
    props.parentSessionSelect(protocol)
  }
  return (
    <Form.Field>
      <label>Template for protocol</label>
      <Select
        placeholder="Select"
        className="small"
        options={items}
        value={protocol}
        onChange={onCatogory}
        clearable
      />
    </Form.Field>
  );
}

export default SessionProtocol;
