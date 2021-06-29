import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header,   Modal,  Tab,Table,  Input, Form, Grid, Image, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
 
import img4 from 'libs/shared-components/src/remove.png';

function ModalDelete() {
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]
      
  const [open, setOpen] = React.useState(false)

  return (
    <div id="navbar">
    <Modal className="modal_media modal_center" style={{top:'150px'}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">  Remove people</Button> }
    >
      
      <Modal.Content body>
        
        <div className="text-center">
         
        <img src={img4}  className="  mr-10 " />
           <h3>Please Confirm</h3>
           <p style={{color: "#000"}}>Are you sure you want to delete this item</p>
            </div>
        
       
      </Modal.Content>
      <Modal.Actions>
    <div className="text-center">
    <Button
          content="submit" 
          onClick={() => setOpen(false)}
          positive
          size='small' className="primary"
        />
        <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
    </div>
   
  
      </Modal.Actions> 

    

    </Modal>
  </div>
  
  )
}

export default ModalDelete
 