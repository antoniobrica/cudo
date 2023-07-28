import React from 'react';

import { GET_COMPANY_WORKTYPES } from '../../graphql/graphql';
import { useCompanyWorkTypeQuery } from '../../services/useRequest';
import { Form, Select } from 'semantic-ui-react';

import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface CompanyWorkTypeProps {
  label?
  workTypeID?
  parentWorkTypeSelect?
}

export function CompanyWorkType(props: CompanyWorkTypeProps) {
  const [items, setItems] = React.useState([])
  const [workType, setWorkType] = React.useState("")

  const { t } = useTranslation()
  const companyId = localStorage.getItem('selectedCompany')

  const { loading, error, data } = useCompanyWorkTypeQuery(GET_COMPANY_WORKTYPES, { variables: { companyId } });
  React.useEffect(() => {
    if (data) {
       setItems(data.workTypes.map(({ workTypeID, name }) => ({ key: workTypeID, value: workTypeID, text: name })));
    }
  }, [data]);

  React.useEffect(() => {
    if (props.workTypeID) {
      setWorkType(props.workTypeID)
    }
  }, [props.workTypeID])

  const onChangeWorkType = (event, data) => {
    const item = { workTypeID: '', name: '' };
    for (let i = 0; i <= items.length; i++) {

      if (items[i]?.value === data.value) {
        item.workTypeID = items[i].key;
        item.name = items[i].text;
      }
    }
    setWorkType(data.value)
    props.parentWorkTypeSelect(item);
  }

  return (
    <Form.Field>
      <label>{props?.label? props?.label:t("project_list.add_new_project.worktype")}</label>
      <Select placeholder={t("common.select")} className="small"
        options={items}
        value={workType}
        onChange={onChangeWorkType}
        clearable
      />
    </Form.Field>
  );
}

export default CompanyWorkType;
