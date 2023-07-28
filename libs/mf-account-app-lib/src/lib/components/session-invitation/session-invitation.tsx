import React from 'react';

import './session-invitation.module.scss';
import {
  Form,
  Select
} from 'semantic-ui-react';
import { useInvitationQuery } from '../../services/useRequest';
import { GET_CATAGORIES, GET_INVITATION, GET_PROTOCOL } from '../../graphql/graphql';
/* eslint-disable-next-line */
export interface SessionInvitationProps {
  parentInvitationSelect
}

export function SessionInvitation(props: SessionInvitationProps) {
  const [items, setItems] = React.useState([])
  const [protocol, setProtocol] = React.useState("")


  const { loading, error, data } = useInvitationQuery(GET_INVITATION);
  React.useEffect(() => {
    if (data) {
      setItems(data.invitationTemplates.map(({ invitationTemplateID, invitationTemplateTitle }) => ({ key: invitationTemplateID, value: invitationTemplateTitle, text: invitationTemplateTitle })));
    }
  }, [data]);

  const onCatogory = (event, data) => {
    const protocol = { invitationTemplateID: '', invitationTemplateTitle: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        protocol.invitationTemplateID = items[i].key;
        protocol.invitationTemplateTitle = data.value;
      }
    }
    setProtocol(data.value)
    props.parentInvitationSelect(protocol)
  }
  return (
    <Form.Field>
      <label>Template for invitation</label>
      <Select
        placeholder="Select"
        className="small"
        options={items}
        value={protocol}
        onChange={onCatogory}
      />
    </Form.Field>
  );
}


export default SessionInvitation;
