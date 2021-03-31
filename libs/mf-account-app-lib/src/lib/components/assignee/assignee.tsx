import React from 'react';
import {  Form,  Select, Dropdown } from 'semantic-ui-react';
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
    if(data){
     setItems(data.users.map(({userName }) => ({ key: userName, value: userName, text: userName })));

    }
  }, [data]);

  const onAssignee = (event, data) => {
    console.log('assignee',data.value)
    setAssignee(data.value)
    props.parentBKPSelect(data)
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
