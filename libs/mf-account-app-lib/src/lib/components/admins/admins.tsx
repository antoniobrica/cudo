import React from 'react';
import './admins.module.scss';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES, GET_USERS } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface AdminsProps {
  parentAdminsSelect,
  admins?,
  error?
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Admins(props: AdminsProps) {
  const [items, setItems] = React.useState([])
  const [admins, setAdmins] = React.useState(null)
  const {t} = useTranslation()
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

  // React.useEffect(() => {
  //   if (props?.admins) {
  //     if (items) {
  //       setAdmins(props?.admins)
  //     }
  //   }
  // }, [items, props?.admins])

  const onAdmins = (event, data) => {
    
    const peopleArr = [];
    for (let i = 0; i < data.value.length; i++) {
      items.map(d => {
        if (d.value == data.value[i]) {
          peopleArr.push({ userID: d.id, userName: data.value[i] });

        }
      })
    }

    setAdmins(data.value)
    props.parentAdminsSelect(peopleArr)
  }
  return (
    <Form.Field>
     
      <label>{t("project_tab_menu.meeting.admin")}<span className="danger">*</span></label>

      <Dropdown className="small_drop follower-select"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        value={admins}
        onChange={onAdmins}
        placeholder={t("common.select")}
        error={props.error}
      />

    </Form.Field>
  );
}

export default Admins;

