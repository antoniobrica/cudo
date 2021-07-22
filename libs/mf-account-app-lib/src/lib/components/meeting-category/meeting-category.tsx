import React from 'react';

import './meeting-category.module.scss';
import {
  Form,
  Select
} from 'semantic-ui-react';
import { useMeetingCatagoriesQuery } from '../../services/useRequest';
import { GET_CATAGORIES } from '../../graphql/graphql';
/* eslint-disable-next-line */
export interface MeetingCategoryProps {
  parentCatagorySelect
}

export function MeetingCategory(props: MeetingCategoryProps) {
  const [items, setItems] = React.useState([])
  const [catagory, setCatagory] = React.useState("")


  const { loading, error, data } = useMeetingCatagoriesQuery(GET_CATAGORIES);
  React.useEffect(() => {
    if (data) {
      setItems(data.MeetingCatagories.map(({ meetingCatagoryTitle, meetingCatagoryID }) => ({ key: meetingCatagoryID, value: meetingCatagoryTitle, text: meetingCatagoryTitle })));

    }
  }, [data]);

  const onCatogory = (event, data) => {
    const catagory = { meetingCatagoryID: '', meetingCatagoryTitle: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        catagory.meetingCatagoryID = items[i].key;
        catagory.meetingCatagoryTitle = data.value;
      }
    }
    setCatagory(data.value)
    props.parentCatagorySelect(catagory)
  }
  return (
    <Form.Field>
      <label>Category</label>
      <Select
        placeholder="Select"
        className="small"
        options={items}
        value={catagory}
        onChange={onCatogory}
        clearable
      />
    </Form.Field>
  );
}

export default MeetingCategory;
