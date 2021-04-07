import React from 'react';

import './file-structure.module.scss';
import { Form, Select } from 'semantic-ui-react';
import { GET_FILE_STRUCTURE } from '../../graphql/graphql';
import { useFileStructureQuery } from '../../services/useRequest';

/* eslint-disable-next-line */
export interface FileStructureProps {
  parentFileStructureSelect
}

export function FileStructure(props: FileStructureProps) {
  const [items, setItems] = React.useState([])
  const [fileStructure, setFileStructureTitle] = React.useState("")

  const { loading, error, data } = useFileStructureQuery(GET_FILE_STRUCTURE);
  React.useEffect(() => {
    if (data) {
      console.log('GET_FILE_TYPE==>', data)
      setItems(data.FileStructure.map(({ fileStructureTitle }) => ({ key: fileStructureTitle, value: fileStructureTitle, text: fileStructureTitle })));
    }
  }, [data]);

  const onFile = (event, data) => {
    setFileStructureTitle(data.value)
    props.parentFileStructureSelect(data)
    // props.parentBKPSelect(data);
  }


  return (
    <Form.Field>
      <label>File Structure</label>
      <Select placeholder='Select' className="small"
        options={items}
        value={fileStructure}
        onChange={onFile}
      />

    </Form.Field>
  );
}
export default FileStructure;

