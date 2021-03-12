import React from 'react';
import { Button, Checkbox,   Modal,   Input, Form, Grid,  Select } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
import img from 'libs/shared-components/src/default.png'; 

function AddNewFolder() {
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]

 
  const [open, setOpen] = React.useState(false)
   
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
    <Input  placeholder='Enter folder name here...' size='small' className="full-width" type="text" />
      
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
          onClick={() => setOpen(false)}
          positive
          size='mini' className="grey-btn"
        />
        <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
        
      </Modal.Actions>
    </Modal>
  </div>
  
  )
}

export default AddNewFolder
 