import React from 'react';
import { Form,  Select } from 'semantic-ui-react';

export interface WorktypeDropdownProps {
    data
    selectedWorkType
    id
}

export function WorkTypeDropdown(props: WorktypeDropdownProps) {
  const [items, setItems] = React.useState([])
  const [workType, setworkType] = React.useState("") 
 
  const onMworkType = (event, data) => {
    setworkType(data.value)
    props.selectedWorkType(workType, props.id)
   }

  return (
    <Form.Field>
    <Select placeholder='Select' className="small" 
      options={props.data}
      value={workType}
      onChange={onMworkType}
    />
  </Form.Field>
  );
}

export default WorkTypeDropdown;
