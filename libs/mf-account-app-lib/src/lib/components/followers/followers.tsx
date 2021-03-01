import React from 'react';

import './followers.module.scss';
import {  Form,  Select } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_USERS } from '../../graphql/graphql';


/* eslint-disable-next-line */
export interface FollowersProps {}

export function Followers(props: FollowersProps) {
  const [items, setItems] = React.useState([])
  const [country, setCountry] = React.useState("")

  const { loading, error, data } = useUsersQuery(GET_USERS);
  React.useEffect(() => {
    if(data){
     setItems(data.users.map(({userName }) => ({ key: userName, value: userName, text: userName })));

    }
  }, [data]);

  const onCountry = (event, data) => {
    setCountry(data.value)
   }
  return (
    <Form.Field>
      <label>Followers  </label>
      <Select placeholder='Select' className="small" 
      options={items}
      value={country}
      onChange={onCountry}
      />
      
    </Form.Field>
  );
}

export default Followers;

