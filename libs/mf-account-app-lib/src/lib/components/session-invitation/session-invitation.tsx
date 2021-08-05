import React from 'react';

import './session-invitation.module.scss';
import {
  Form,
  Select
} from 'semantic-ui-react';
import { useInvitationQuery } from '../../services/useRequest';
import { GET_CATAGORIES, GET_INVITATION, GET_PROTOCOL } from '../../graphql/graphql';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface SessionInvitationProps {
  parentInvitationSelect?
  editInvitationTemplateIdSelect?
  error?
}

export function SessionInvitation(props: SessionInvitationProps) {
  const [items, setItems] = React.useState([])
  const [protocol, setProtocol] = React.useState("")
  const {t} = useTranslation()

  const { loading, error, data } = useInvitationQuery(GET_INVITATION);
  React.useEffect(() => {
    if (data) {
      setItems(data.invitationTemplates.map(({ invitationTemplateID, invitationTemplateTitle }) => ({ key: invitationTemplateID, value: invitationTemplateTitle, text: invitationTemplateTitle })));
    }
  }, [data]);

  React.useEffect(()=>{
    if(props?.editInvitationTemplateIdSelect){
      if(items){
        const invitationTemplate = { invitationTemplateID: '', invitationTemplateTitle: '' };
        for (let i = 0; i <= items.length; i++) {
          if (items[i]?.key === props.editInvitationTemplateIdSelect) {
            invitationTemplate.invitationTemplateID = items[i].key;
            invitationTemplate.invitationTemplateTitle = items[i].value;
          }
        }
        setProtocol(invitationTemplate.invitationTemplateTitle)
        props.parentInvitationSelect(invitationTemplate)
      }
    }
  },[items, props?.editInvitationTemplateIdSelect])

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
    <>
      <label>{t("project_tab_menu.meeting.template_for_invitation")}<span className="danger">*</span></label>
      <Select
        placeholder={t("common.select")}
        className="small"
        options={items}
        value={protocol}
        onChange={onCatogory}
        clearable
        error={props?.error}
      />
    </>
  );
}


export default SessionInvitation;
