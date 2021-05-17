import React from 'react';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_USERS } from '../../graphql/graphql';

import './assignee.module.scss';

/* eslint-disable-next-line */
export interface AssigneeProps {
  parentBKPSelect
}

export function Assignee(props: AssigneeProps) {
  const [items, setItems] = React.useState([])
  const [assignee, setAssignee] = React.useState("")

  const { loading, error, data } = useUsersQuery(GET_USERS);
  React.useEffect(() => {
    if (data) {
      setItems(data.users.map(({ userName, userID }) => ({ key: userName, value: userName, text: userName, id: userID })));

    }
  }, [data]);

  const onAssignee = (event, data) => {
    const peopleArr = [];
    for (let i = 0; i < data.value.length; i++) {
      items.map(d => {
        if (d.value == data.value[i]) {
          peopleArr.push({ userID: d.id, userName: data.value[i] });

        }
      })
    }

    setAssignee(data.value)
    props.parentBKPSelect(peopleArr)
  }
  return (
    <Form.Field>
      {/* <label>Assignee  </label>
      <Select placeholder='Select' className="small" 
      options={items}
      value={assignee}
      onChange={onAssignee}
      /> */}
      <label>Select Multiple people</label>

      <Dropdown className="small_drop"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        //value={assignee}
        onChange={onAssignee}
        placeholder='Select'
      />

    </Form.Field>
  );
}

export default Assignee;
