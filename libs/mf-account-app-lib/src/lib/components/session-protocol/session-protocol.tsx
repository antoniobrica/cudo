import React from 'react';

import './session-protocol.module.scss';
import {
  Form,
  Select
} from 'semantic-ui-react';
import { useProtocolQuery } from '../../services/useRequest';
import { GET_CATAGORIES, GET_PROTOCOL } from '../../graphql/graphql';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface SessionProtocolProps {
  parentSessionSelect?
  editProtocolTemplateIdSelect?
  error?
}

export function SessionProtocol(props: SessionProtocolProps) {
  const [items, setItems] = React.useState([])
  const [protocol, setProtocol] = React.useState("")
  const {t} = useTranslation()

  const { loading, error, data } = useProtocolQuery(GET_PROTOCOL);
  React.useEffect(() => {
    if (data) {
      setItems(data.ProtocoleTemplates.map(({ protocolTemplateID, protocolTemplateTitle }) => ({ key: protocolTemplateID, value: protocolTemplateTitle, text: protocolTemplateTitle })));

    }
  }, [data]);

  React.useEffect(()=>{
    if(props?.editProtocolTemplateIdSelect){
      if(items){
        const protocolTemplate = { protocolTemplateID: '', protocolTemplateTitle: '' };
        for (let i = 0; i <= items.length; i++) {
          if (items[i]?.key === props.editProtocolTemplateIdSelect) {
            protocolTemplate.protocolTemplateID = items[i].key;
            protocolTemplate.protocolTemplateTitle = items[i].value;
          }
        }
        setProtocol(protocolTemplate.protocolTemplateTitle)
        props.parentSessionSelect(protocolTemplate)
      }
    }
  },[items, props?.editProtocolTemplateIdSelect])


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
    <>
      <label>{t("project_tab_menu.meeting.template_for_protocol")}<span className="danger">*</span></label>
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

export default SessionProtocol;
