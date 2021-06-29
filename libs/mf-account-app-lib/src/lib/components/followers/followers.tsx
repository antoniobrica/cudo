import React from 'react';
import './followers.module.scss';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES, GET_USERS } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface FollowersProps {
  parentFollowersSelect,
  followers?,
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Followers(props: FollowersProps) {
  const [items, setItems] = React.useState([])
  const [followers, setFollowers] = React.useState(null)

  const { loading, error, data } = useQuery(GET_REFERENCES, {
    variables: {
      referenceType: ReferenceType.COMPANY,
      referenceID: "Sftobiz_1234"
    }
  });

  // React.useEffect(() => {
  //   if (props.followers) {
  //     const fl = null;
  //     (props.followers).map(f => {
  //       //fl.push(f.userName)
  //       setFollowers(f.userName)
  //     })
  //     // setFollowers(fl)
  //   }
  // }, [props.followers])
  React.useEffect(() => {
    if (data) {
      setItems(data.references.users.map(({ userName, userID }, id) => ({ key: id, value: userName, text: userName, id: userID })));
    }
  }, [data]);


  // const onFollowers = (event, data) => {
  //   const people = { userID: '', userName: '' };
  //   for (let i = 0; i <= items.length; i++) {
  //     if (items[i]?.value === data.value) {
  //       people.userID = items[i].key;
  //       people.userName = data.value;
  //     }
  //   }

  //   setFollowers(data.value)
  //   props.parentFollowersSelect(people);
  // }
  const onFollowers = (event, data) => {
    console.log('followers--', data.value)
    const peopleArr = [];
    for (let i = 0; i < data.value.length; i++) {
      items.map(d => {
        if (d.value == data.value[i]) {
          peopleArr.push({ userID: d.id, userName: data.value[i] });

        }
      })
    }

    setFollowers(data.value)
    props.parentFollowersSelect(peopleArr)
  }
  return (
    <Form.Field>
      {/* <label>Assignee  </label>
      <Select placeholder='Select' className="small"
        options={items}
        value={followers}
        onChange={onFollowers}
      /> */}

      <label>Followers</label>

      <Dropdown className="small_drop"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        value={followers}
        onChange={onFollowers}
        placeholder='Select'
      />

    </Form.Field>
  );
}

export default Followers;

