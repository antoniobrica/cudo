import React from 'react';
import './members.module.scss';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES, GET_USERS } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface MembersProps {
  parentMembersSelect,
  members?,
  error?
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Members(props: MembersProps) {
  const [items, setItems] = React.useState([])
  const [members, setMembers] = React.useState(null)

  const { loading, error, data } = useQuery(GET_REFERENCES, {
    variables: {
      referenceType: ReferenceType.COMPANY,
      referenceID: "Sftobiz_1234"
    }
  });

  React.useEffect(() => {
    if (data) {
      setItems(data.references.users.map(({ userName, userID }, id) => ({ key: id, value: userName, text: userName, id: userID })));
    }
  }, [data]);

  const onMembers = (event, data) => {
    console.log('members--', data.value)
    const peopleArr = [];
    for (let i = 0; i < data.value.length; i++) {
      items.map(d => {
        if (d.value == data.value[i]) {
          peopleArr.push({ userID: d.id, userName: data.value[i] });

        }
      })
    }

    setMembers(data.value)
    props.parentMembersSelect(peopleArr)
  }
  return (
    <Form.Field>
     
      {/* <label>Members</label> */}

      <Dropdown className="small_drop follower-select"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        value={members}
        onChange={onMembers}
        placeholder='Select'
        error={props.error}
      />

    </Form.Field>
  );
}

export default Members;

