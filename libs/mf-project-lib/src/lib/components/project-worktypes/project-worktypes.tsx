import React from 'react';
import { useLocation } from 'react-router-dom';

import { GET_PROJECT_BY_ID } from '../../graphql/graphql';

import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { Form, Select } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface ProjectWorkTypeProps {
  label?;
  workTypeID?;
  parentWorkTypeSelect?;
}

export function ProjectWorkType(props: ProjectWorkTypeProps) {
  const [items, setItems] = React.useState([]);
  const [workType, setWorkType] = React.useState('');

  const { t } = useTranslation();

  const location = useLocation();

  const res = location.pathname.split('/');
  const projectId = res[3].toString();

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, { variables: { projectId } });
  React.useEffect(() => {
    console.log('---data---', data);
    if (data) {
      setItems(
        data.projectById[0].projectWorkTypes.map(({ projectWorkTypeID, workID, workTypeName }) => ({
          key: projectWorkTypeID,
          value: workID,
          text: workTypeName,
        }))
      );
    }
  }, [data]);

  React.useEffect(() => {
    if (props.workTypeID) {
      setWorkType(props.workTypeID);
    }
  }, [props.workTypeID]);

  const onChangeWorkType = (event, data) => {
    console.log('--onChangeWorkType--data--', data);
    const item = { projectWorkTypeID: '', workID: '', workTypeName: '' };
    for (let i = 0; i <= items?.length; i++) {
      if (items[i]?.value === data.value) {
        item.projectWorkTypeID = items[i].key;
        item.workID = items[i].value;
        item.workTypeName = items[i].text;
      }
    }
    setWorkType(data.value);
    props.parentWorkTypeSelect(item);
  };

  return (
    <Form.Field>
      <label>{props?.label ? props.label : t('project_list.add_new_project.worktype')}</label>
      <Select
        placeholder={t('common.select')}
        className="small"
        options={items}
        value={workType}
        onChange={onChangeWorkType}
        clearable
      />
    </Form.Field>
  );
}

export default ProjectWorkType;
