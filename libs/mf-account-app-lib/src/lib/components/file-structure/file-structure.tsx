import React from 'react';

import './file-structure.module.scss';
import { Form, Select } from 'semantic-ui-react';
import { GET_FILE_STRUCTURE } from '../../graphql/graphql';
import { useFileStructureQuery } from '../../services/useRequest';

/* eslint-disable-next-line */
export interface FileStructureProps {
  parentFileStructureSelect?
  structureTitle?
}

export function FileStructure(props: FileStructureProps) {
  const [items, setItems] = React.useState([])
  const [fileStructure, setFileStructureTitle] = React.useState("")

  const { loading, error, data } = useFileStructureQuery(GET_FILE_STRUCTURE);
  React.useEffect(() => {
    if (props.structureTitle) {
      setFileStructureTitle(props.structureTitle)
    }
  }, [props.structureTitle])
  React.useEffect(() => {
    if (data) {
      setItems(data.FileStructure.map(({ fileStructureTitle, fileStructureID }) => ({ key: fileStructureID, value: fileStructureTitle, text: fileStructureTitle })));
    }
  }, [data]);

  const onFile = (event, data) => {
    const file = { structureID: '', structureTitle: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        file.structureID = items[i].key;
        file.structureTitle = data.value;
      }
    }
    setFileStructureTitle(data.value)
    props.parentFileStructureSelect(file)
  }


  return (
    <Form.Field>
      <label>File Structure</label>
      <Select placeholder='Select' className="small"
        options={items}
        value={fileStructure}
        onChange={onFile}
        clearable
      />

    </Form.Field>
  );
}
export default FileStructure;

