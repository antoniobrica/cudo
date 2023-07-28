 
import React from 'react';
import { Button, Accordion,   Modal,  Tab,Checkbox,  Input, Form, Grid, Card, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
  


function AddPeoplePermission() {
  const [secondOpen, setSecondOpen] = React.useState(false)
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]
      const level1Panels = [
        { key: 'panel-1a', title: 'Task', content: 'Create & edit tasks' },
        
      ]
      
      const Level1Content = (
        <div>
           
          <Accordion.Accordion panels={level1Panels} />
        </div>
      )
      
      const level2Panels = [
        { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
        { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
      ]
      
      const Level2Content = (
        <div>
         
          <Accordion.Accordion panels={level2Panels} />
        </div>
      )
      
      const rootPanels = [
        { key: 'panel-1', title: 'Electrical Work', content: { content: Level1Content },  },
        { key: 'panel-2', title: 'HVAC Work', content: { content: Level2Content } },
      ]
          
  const [open, setOpen] = React.useState(false)
  const panes = [
    {
      menuItem: { key: 'user plus', icon: 'user plus', content: 'Select people'},
    
      render: () => <Tab.Pane attached={false}>
            {/* <SampleModal/> */}
       
 
<Form>
<Grid columns={3}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>First Name <span className="danger">*</span></label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field>
      <label>Last Name <span className="danger">*</span></label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Email <span className="danger">*</span></label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>

<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Address 1 <span className="danger">*</span></label>
      <Select clearable placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
     
  </Grid.Column>

  <Grid.Column>
  <Form.Field>
      <label>Type of building <span className="danger">*</span></label>
      <Select clearable placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={3}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>City </label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Pin </label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>City </label>
      <Select clearable placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>
  
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Welcome message to send (optional) </label>
      
      <TextArea placeholder='Tell us more' className="full-width" />
    </Form.Field>
  </Grid.Column>
   
  
</Grid.Row>
</Grid>
</Form>

      </Tab.Pane>,
    },
    {
      menuItem: {key: 'users', icon: 'users', content: 'Manage access'},
      
      render: () => <Tab.Pane attached={false}> 


      
      <Form>
        
      <Grid columns={2}>
<Grid.Row className="backcontent">
  <Grid.Column>
    <Form.Field>
      <label>Type(Manage user role type) </label>
     
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
    <Select clearable placeholder='Select' className="small" options={countryOptions} />
            
    </Form.Field>
  </Grid.Column>
  
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <Checkbox label='All projects' />  &nbsp; &nbsp;<strong>Or</strong>
   
    </Form.Field>
  </Grid.Column> 
</Grid.Row>
</Grid>
<Grid columns={1}>

<Grid.Row>

<Grid.Column >
<Form.Field>
<Input placeholder='Search...' size='small' className="full-width" type="text" />
  </Form.Field>
</Grid.Column>
</Grid.Row>



</Grid>
<Grid columns={1}>
<Grid.Row>

<Grid.Column > 
<Card.Group>
    <Card className="widthaccord">
      <Card.Content>
        
        <Card.Description>
        Burj Khalifa
        <span style={{float:'right'}}>  <Checkbox toggle /></span>
       
        </Card.Description><br/>
        <Card.Description>
        Burj Khalifa
        <span style={{float:'right'}}>  <Checkbox toggle /></span>
       
        </Card.Description>
      </Card.Content>
    </Card>
    </Card.Group>
</Grid.Column>

</Grid.Row>
</Grid>

      </Form>
     
      
      </Tab.Pane>
    }
     
  ]
  

    
  return (
    <div id="navbar">
    <Modal className="modal_media modal_center"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">Add new user</Button> }
      closeOnDimmerClick={false}
    >
      <Modal.Header><h3>Add New User </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            

        <Modal.Description>
          
        </Modal.Description>
           
            </div>
        
       
      </Modal.Content>
      <Modal.Actions>
     
        <div>
        <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
      <Button
          content="Submit" 
          onClick={() => setOpen(false)}
          positive
          size='small' className="primary"
        />

        </div>
        
      </Modal.Actions>

 




    </Modal>
  </div>
  
  )
}

export default AddPeoplePermission
 