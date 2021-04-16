import React from 'react';
import { Form,  Select } from 'semantic-ui-react';

export interface WorktypeDropdownProps {
    data
    selectedWorkType
    id
}

export function WorkTypeDropdown(props: WorktypeDropdownProps) {
  const [items, setItems] = React.useState([])
  const [workType, setworkType] = React.useState(null) 
 
  const onMworkType = (event, data) => {
   console.log('events',data);
   
    console.log('wtd', data.value)
    setworkType(data.value)
    if(data.value){
    props.selectedWorkType(data.value, props.id)
  }
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
