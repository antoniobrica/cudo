import React from 'react';
import { GET_FILE_TYPE } from '../../graphql/graphql';
import { useFileTypeQuery } from '../../services/useRequest';
import { Form, Select } from 'semantic-ui-react';
import './file-type.module.scss';

/* eslint-disable-next-line */
export interface FileTypeProps {
  parentFileTypeSelect?
  fileTypeName
}

export function FileType(props: FileTypeProps) {
  const [items, setItems] = React.useState([])
  const [fileType, setFileType] = React.useState("")

  const { loading, error, data } = useFileTypeQuery(GET_FILE_TYPE);
  React.useEffect(() => {
    if (data) {
      setItems(data.FileTypes.map(({ fileTypeTitle, fileTypeID }) => ({ key: fileTypeID, value: fileTypeTitle, text: fileTypeTitle })));
    }
  }, [data]);
  React.useEffect(() => {
    if (props.fileTypeName) {
      setFileType(props.fileTypeName)
    }
  }, [props.fileTypeName])

  const onFile = (event, data) => {
    const file = { fileTypeID: '', fileTypeTitle: '' };
    for (let i = 0; i <= items.length; i++) {

      if (items[i]?.value === data.value) {
        file.fileTypeID = items[i].key;
        file.fileTypeTitle = data.value;
      }
    }
    setFileType(data.value)
    props.parentFileTypeSelect(file);
  }


  return (
    <Form.Field>
      <label>File type</label>
      <Select placeholder='Select' className="small"
        options={items}
        value={fileType}
        onChange={onFile}
      />

    </Form.Field>
  );
}

export default FileType;
