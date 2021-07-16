 
import React from 'react';
import { Button, Header,   Modal,  Tab,Table,  Input, Form, Grid, Image, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
 


function ManageFileStructure() {
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]

 
  const [open, setOpen] = React.useState(false)
   
  return (
    <div id="navbar">
    <Modal className="modal_media"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">Manage naming</Button> }
    >
      <Modal.Header><h3>Manage file naming structure </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
 
      
      <Form>
      <Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Items  </label>
        
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>

</Grid>
<Table celled className="default_table">
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>From</Table.HeaderCell>
        <Table.HeaderCell>To</Table.HeaderCell>
        <Table.HeaderCell>Field name</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>  <Input placeholder='1' size='small' className="full-width" type="text" /> </Table.Cell>
        <Table.Cell> <Input placeholder='5' size='small' className="full-width" type="text" /></Table.Cell>
      
        <Table.Cell><Input placeholder='5' size='small' className="full-width" type="text" /> </Table.Cell>
        <Table.Cell> <Input placeholder='selected number(s) will be assign for Phase number' size='small' className="full-width" type="text" /></Table.Cell>
        <Table.Cell> <i className="ms-Icon ms-Icon--ChromeClose " aria-hidden="true" style={{color:'#D0D8DF'}}></i> </Table.Cell>
      </Table.Row>
      
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>  <Input placeholder='1' size='small' className="full-width" type="text" /> </Table.Cell>
        <Table.Cell> <Input placeholder='5' size='small' className="full-width" type="text" /></Table.Cell>
      
        <Table.Cell><Input placeholder='5' size='small' className="full-width" type="text" /> </Table.Cell>
        <Table.Cell> <Input placeholder='selected number(s) will be assign for Phase number' size='small' className="full-width" type="text" /></Table.Cell>
        <Table.Cell> <i className="ms-Icon ms-Icon--ChromeClose " aria-hidden="true" style={{color:'#D0D8DF'}}></i> </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>3</Table.Cell>
        <Table.Cell>  <Input placeholder='1' size='small' className="full-width" type="text" /> </Table.Cell>
        <Table.Cell> <Input placeholder='5' size='small' className="full-width" type="text" /></Table.Cell>
      
        <Table.Cell><Input placeholder='5' size='small' className="full-width" type="text" /> </Table.Cell>
        <Table.Cell> <Input placeholder='selected number(s) will be assign for Phase number' size='small' className="full-width" type="text" /></Table.Cell>
        <Table.Cell> <i className="ms-Icon ms-Icon--ChromeClose " aria-hidden="true" style={{color:'#D0D8DF'}}></i> </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  <Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     <a href="">
     <i className="ms-Icon ms-Icon--CalculatorAddition " aria-hidden="true" style={{color:'#D0D8DF'}}></i>
     Add New  </a>  
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
          size='small' className="primary"
        />
        <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
        
      </Modal.Actions>
    </Modal>
  </div>
  
  )
}

export default ManageFileStructure
 