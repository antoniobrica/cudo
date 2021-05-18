import React from 'react';

import './followers.module.scss';
import { Form, Select } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_USERS } from '../../graphql/graphql';


/* eslint-disable-next-line */
export interface FollowersProps {
  parentFollowersSelect
}

export function Followers(props: FollowersProps) {
  const [items, setItems] = React.useState([])
  const [followers, setFollowers] = React.useState("")

  const { loading, error, data } = useUsersQuery(GET_USERS);
  React.useEffect(() => {
    if (data) {
      setItems(data.userByEmail.map(({ userName }) => ({ key: userName, value: userName, text: userName })));

    }
  }, [data]);

  const onFollowers = (event, data) => {
    setFollowers(data.value)
    props.parentFollowersSelect(data)
  }
  return (
    <Form.Field>
      <label>Followers  </label>
      <Select placeholder='Select' className="small"
        options={items}
        value={followers}
        onChange={onFollowers}
      />

    </Form.Field>
  );
}

export default Followers;

