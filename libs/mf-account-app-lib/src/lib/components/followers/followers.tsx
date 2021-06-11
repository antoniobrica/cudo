import React from 'react';
import './followers.module.scss';
import { Form, Select } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES, GET_USERS } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface FollowersProps {
  parentFollowersSelect
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Followers(props: FollowersProps) {
  const [items, setItems] = React.useState([])
  const [followers, setFollowers] = React.useState("")

  const { loading, error, data } = useQuery(GET_REFERENCES, {
    variables: {
      referenceType: ReferenceType.COMPANY,
      referenceID: "Sftobiz_1234"
    }
  });
  React.useEffect(() => {
    if (data) {
      setItems(data.references.users.map(({ userName, userID }) => ({ key: userID, value: userName, text: userName, id: userID })));
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

