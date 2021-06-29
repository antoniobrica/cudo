 
import React from 'react';
import { Button, Accordion,   Modal,  Tab,Checkbox,  Input, Form, Grid, Segment, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
  

function PremissionPeople() {
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
       render: () =>  
 
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
    <Select placeholder='Select' className="small" options={countryOptions} />
            
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
<Accordion className="widtharea" defaultActiveIndex={0} panels={rootPanels} styled  />
</Grid.Column>

</Grid.Row>
</Grid>
      </Form>
      
    }
     
  ]
  
 
  return (
    <div id="navbar">
    <Modal className="modal_media modal_center"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">User Permission</Button> }
    >
      <Modal.Header><h3>User Project Permissions </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
        <Tab  panes={panes} />
            

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

export default PremissionPeople
 