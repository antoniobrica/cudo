import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form,  Select } from 'semantic-ui-react';

export interface WorktypeDropdownProps {
    data
    selectedWorkType
    id
}

export function WorkTypeDropdown(props: WorktypeDropdownProps) {
 
  const [workType, setworkType] = React.useState(null) 
  const {t} = useTranslation()
 
  const onMworkType = (event, data) => {
     setworkType(data.value)
    if(data.value){
    props.selectedWorkType(data.value, props.id)
  }
   }

  return (
    <Form.Field>
    <Select placeholder={t("common.select")} className="small" 
      options={props.data}
      value={workType}
      onChange={onMworkType}
      clearable
    />
  </Form.Field>
  );
}

export default WorkTypeDropdown;
