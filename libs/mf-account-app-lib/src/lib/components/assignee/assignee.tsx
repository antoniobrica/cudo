import React from 'react';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES } from '../../graphql/graphql';

import './assignee.module.scss';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface AssigneeProps {
  parentAsigneeSelect,
  name?,
  assignees?,
  error?
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Assignee(props: AssigneeProps) {
  const [items, setItems] = React.useState([])
  const [assignee, setAssignee] = React.useState("")
  const {t} = useTranslation()

  const { loading, error, data } = useQuery(GET_REFERENCES, {
    variables: {
      referenceType: ReferenceType.COMPANY,
      referenceID: "Sftobiz_1234"
    }
  });

  React.useEffect(() => {
    if (props?.assignees[0]?.userName) {
     setAssignee(props?.assignees[0]?.userName)
    }
  }, [props?.assignees[0]?.userName])

  React.useEffect(() => {
    if (data) {
      setItems(data.references.users.map(({ userName, userID }) => ({ key: userID, value: userName, text: userName, id: userID })));

    }
  }, [data]);

  const onAssignee = (event, data) => {
    const people = { userID: '', userName: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        people.userID = items[i].key;
        people.userName = data.value;
      }
    }

    setAssignee(data.value)
    props.parentAsigneeSelect(people)
  }
  // const onFollowers = (event, data) => {
  //   const people = { userID: '', userName: '' };
  //   for (let i = 0; i <= items.length; i++) {
  //     if (items[i]?.value === data.value) {
  //       people.userID = items[i].key;
  //       people.userName = data.value;
  //     }
  //   }

  //   setFollowers(data.value)
  //   props.parentFollowersSelect(people);
  // }
  return (
    <Form.Field>
      <label>{t("common.assignee")} <span className="danger">*</span> </label>
      <Select placeholder={t("common.select")} className="small"
        options={items}
        value={assignee}
        onChange={onAssignee}
        clearable
        error={props.error}
      />
      {props.error && <span className="error-message">{t("common.errors.assignee_error")}</span>}
      {/* <label>{props.name}</label>

      <Dropdown className="small_drop"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        value={assignee}
        onChange={onAssignee}
        placeholder='Select'
      /> */}

    </Form.Field>
  );
}

export default Assignee;
