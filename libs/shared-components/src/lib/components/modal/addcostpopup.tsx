import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header,   Modal,  Tab,Table,  Input, Form, Grid, Image, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
import img4 from 'libs/shared-components/src/dots.png';


function ModalCost() {
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]

 
  const [open, setOpen] = React.useState(false)
   
  return (
    <div id="navbar">
    <Modal className="modal_media" style={{ height: '660px'}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">+ Add  New</Button> }
    >
      <Modal.Header><h3>Add new items </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
 
      
      <Form>
 

  
<Grid columns={2}>
<Grid.Row  className="content">
  <Grid.Column >
    <Form.Field>
       
       <div>
            <p className="paragraph">Select house <span className="sessiontext">(This house will contain all the BKP)</span></p>
            
            </div>
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
  <Select placeholder='Select' className="small" options={countryOptions} />
     </Form.Field>
     </Grid.Column>
 
</Grid.Row>

</Grid>

</Form>

  
      
<div>
<Header className="header" >Items</Header>
</div>

        <Table>
<Table.Header>
<Table.Row>
<Table.HeaderCell></Table.HeaderCell>
<Table.HeaderCell># </Table.HeaderCell>
<Table.HeaderCell>BKP</Table.HeaderCell>
<Table.HeaderCell>Description</Table.HeaderCell>
<Table.HeaderCell>Files</Table.HeaderCell>
<Table.HeaderCell>Item quality</Table.HeaderCell>
<Table.HeaderCell>Item price</Table.HeaderCell>
<Table.HeaderCell></Table.HeaderCell>

</Table.Row>
</Table.Header>

<Table.Body>
<Table.Row>
<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <span> <img src={img4}/>  </span>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>

 
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    1
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>

 
</Form>

</Table.Cell>
<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <button className="ui mini button grey-btn" >2</button> </span>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <a href="">X</a> 
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

</Table.Row>

<Table.Row>
<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <span> <img src={img4}/>  </span>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>

 
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    1
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>

 
</Form>

</Table.Cell>
<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
   <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <button className="ui mini button grey-btn" >2</button> </span>
     </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input  size='small' className="full-width" style={{width:'130px'}}/>
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <a href="">X</a> 
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>

</Table.Row>

<Table.Row>
<Table.Cell>
 <a href="">+ Add more </a> 

</Table.Cell>
<Table.Cell></Table.Cell>
<Table.Cell>
 
</Table.Cell>

<Table.Cell></Table.Cell>

<Table.Cell></Table.Cell>

<Table.Cell></Table.Cell>

<Table.Cell></Table.Cell>

<Table.Cell></Table.Cell>
</Table.Row>
</Table.Body>
</Table>       
 
           
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

export default ModalCost
 