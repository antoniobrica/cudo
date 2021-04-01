import React from 'react';
import { GET_FILE_TYPE } from '../../graphql/graphql';
import { useFileTypeQuery } from '../../services/useRequest';
import { Form, Select } from 'semantic-ui-react';
import './file-type.module.scss';

/* eslint-disable-next-line */
export interface FileTypeProps { }

export function FileType(props: FileTypeProps) {
  const [items, setItems] = React.useState([])
  const [fileType, setFileType] = React.useState("")

  const { loading, error, data } = useFileTypeQuery(GET_FILE_TYPE);
  React.useEffect(() => {
    if (data) {
      console.log('GET_FILE_TYPE==>', data)
      setItems(data.FileTypes.map(({ fileTypeTitle }) => ({ key: fileTypeTitle, value: fileTypeTitle, text: fileTypeTitle })));
    }
  }, [data]);

  const onFile = (event, data) => {
    setFileType(data.value)
    // props.parentBKPSelect(data);
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
