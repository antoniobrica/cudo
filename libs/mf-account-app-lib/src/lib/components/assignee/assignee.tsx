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
      console.log('pp',data);
     setItems(data.users.map(({userName, userID }) => ({ key: userName, value: userName, text: userName, id: userID})));

    }
  }, [data]);

  const onAssignee = (event, data) => {
    const peopleArr=[];
    for (let i = 0; i < data.value.length; i++) {      
      items.map(d =>{
        if(d.value == data.value[i] ){
          console.log(d.value)
          peopleArr.push({userID:d.id, userName:data.value[i]});

        }
      })
    }
    console.log('peopleArr',peopleArr);
    
    // for(let i=0; i< items.length; i++){
    //   // console.log('lkkk',items[i]);
    //   // for( let j=0; j< peopleArr.length; j++){
    //   //   if(items[i]?.value === peopleArr[j]?.userName){
    //   //     console.log('jj',peopleArr[j].userName)
    //   //     peopleArr.push({userID: items[i]?.id, userName:data?.value[j]});
    //   //   }
    //   // }
    // }
  
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
