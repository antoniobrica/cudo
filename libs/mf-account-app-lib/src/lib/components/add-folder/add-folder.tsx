import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Button, Checkbox,   Modal,   Input, Form, Grid,  Select } from 'semantic-ui-react';
import { ADD_FOLDER, GET_FOLDER } from '../../graphql/graphql';
import { IFolder } from '../../interfaces/task';
import { useAddFolderMutation } from '../../services/useRequest';

import './add-folder.module.scss';

/* eslint-disable-next-line */
export interface AddFolderProps {
  open,
  cancel,
  folderData
}

export function AddFolder(props: AddFolderProps) {
  
   const [folderTitle, setfolderTitle] = React.useState("");
   const [addFolder] = useAddFolderMutation(ADD_FOLDER);

   const [open, setOpen] = React.useState(false);
   const [folderName, setfolderName] = React.useState("");
 
   React.useEffect(()=>{
    if(props.open){
     setOpen(props.open);
    }
   }, [props.open])
   const openF =()=>{
 
   }
 const onfolderTitle =(e)=>{
   const fname = e.target.value;
   console.log('fname', fname);
   setfolderTitle(fname)
  }
  const handleSaveFile = () => {
    console.log('handleSaveFile');
    props.folderData(folderName);
    props.cancel(false);
    addFolder({
      variables: {
        folderTitle
      },
      update: (
        cache,
        { data }
      ) => {
        const cacheData = cache.readQuery({ query: GET_FOLDER }) as IFolder;
        cache.writeQuery({
          query: GET_FOLDER,
          data: {
            tasks: [...cacheData.folderID, data]
          }
        });
      }
    });

  };
  const cancel =() =>{
    setOpen(false);
    props.cancel(false);
  }
 const onFolderName =(e)=>{
   const fname = e.target.value;
   console.log('fname', fname);
   setfolderName(fname)
  }

  const onSubmit=()=>{
    props.folderData(folderName);
    props.cancel(false);
  }
   

  return (
    <div id="navbar">
    <Modal className="modal_media modal_center modal_media_1"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn"> Add Folder</Button> }
    >
      <Modal.Header><h3>Add new folder </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
 
      
      <Form>

      <Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <label>Folder name</label>
    <Input  placeholder='Enter folder name here...' size='small' className="full-width" type="text" 
    value={folderTitle}
    onChange={onfolderTitle}
  />
      
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
 
</Form>
  </div>   
      </Modal.Content>
      <Modal.Actions>
      <Button
          content="Submit" 
          onClick={handleSaveFile}
          positive
          size='small' className="primary"
        />
        <Button size='small' className="icon-border" onClick={cancel}>
        X  Cancel
        </Button>
        
      </Modal.Actions>
    </Modal>
  </div>
  
  )
}

export default AddFolder;
