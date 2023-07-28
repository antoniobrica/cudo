
import React from 'react';
import { Button, Header,   Modal,  Tab,Table,  Input, Form, Grid, Image, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
 
import img2 from 'libs/shared-components/src/bagela.png';

function EditProject() {
  const [secondOpen, setSecondOpen] = React.useState(false)
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]
  const [open, setOpen] = React.useState(false)
  const panes = [
    {
      menuItem: 'Information',
      render: () => <Tab.Pane attached={false}>
            {/* <SampleModal/> */}
            <div className="content">
                <div className="description"> <img src={img2}  />
                <Button className="secondary_btn" size='mini' primary>Click to upload</Button>
                
                </div> 
                
            </div>




            <div>

<Header className="header" >Project Information</Header>
</div>
<Form>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>What's the Project Name? <span className="danger">*</span></label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field>
      <label>Internal Project Number  <span className="danger">*</span></label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>

<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Client <span className="danger">*</span></label>
      <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
 
  </Grid.Column>

  <Grid.Column>
  <Form.Field>
      <label>Type of building <span className="danger">*</span></label>
      <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Printing Company </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>

  
</Grid.Row>
</Grid>

</Form>
<div>
<Header className="header" >Manage work type and estimated cost</Header>
</div>

        <Table>
<Table.Header>
<Table.Row>
<Table.HeaderCell>Work Type</Table.HeaderCell>
<Table.HeaderCell> </Table.HeaderCell>
<Table.HeaderCell>Estimate Cost</Table.HeaderCell>

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
    <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>
<Table.Cell></Table.Cell>
<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input label='$' size='small' className="full-width"/>
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
    <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>

</Grid.Row>
</Grid>
</Form>

</Table.Cell>
<Table.Cell></Table.Cell>
<Table.Cell>
<Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
     
    <Input label='$' size='small' className="full-width"/>
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
</Table.Row>
</Table.Body>
</Table>

<div>

<Header className="header" >Address Information</Header>

</div>
<Form>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Address Line 1  </label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field>
      <label>Address Line 2   </label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>

<Grid columns={4}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>City</label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
  <Form.Field>
      <label>State</label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
  <Form.Field>
      <label>Zip</label>
      <Input placeholder='Default' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
  <Form.Field>
      <label>State</label>
      <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Description </label>
      <TextArea placeholder='Tell us more' />
    </Form.Field>
  </Grid.Column>

  
</Grid.Row>
</Grid>
<Button
          content="Update" 
          onClick={() => setOpen(false)}
          positive
          size='mini' className="grey-btn"
        />
        <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
</Form>





      </Tab.Pane>,
    },
    {
      menuItem: 'People',
      render: () => <Tab.Pane attached={false}> 


      
      <Form>
      <Header className="header" >Add people to this project?</Header>
      <Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field> <Select placeholder='Select' className="small" options={countryOptions} />
            
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
        
    <Input placeholder='Search existing user' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  
</Grid.Row>
</Grid>


        
<Grid columns={1}>

<Grid.Row>
<Grid.Column>
<div className="content">
                 
                <p className="paragraph center"> <i aria-hidden="true" className="envelope outline icon"></i> Can't find who you are looking for? <a href="" className="anchor">Click here to invite a new user </a> </p>
            </div>
</Grid.Column>

</Grid.Row>
 

<Grid.Row>

<Grid.Column >
<Form.Field>
      <label className="top-area">Add people to this project? </label>
        </Form.Field>
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="table-head">People</Table.HeaderCell>
        <Table.HeaderCell className="table-head">Work Type</Table.HeaderCell>
        <Table.HeaderCell > </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      
      <Table.Row>
        <Table.Cell>
        <div>
    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
    <span>Gleb Kuznetsov</span>
  </div>
        </Table.Cell>
        <Table.Cell>
        <Form.Field>
            <Select placeholder='Select' className="small" options={countryOptions} />
            
            </Form.Field>
             </Table.Cell>
             <Table.Cell> 
           <a href="" > <i aria-hidden="true" className="trash alternate outline icon"></i></a>
         </Table.Cell>         
      </Table.Row>
      <Table.Row>
        <Table.Cell>
        <div>
    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
    <span>Zhenya Rynzhuk</span>
  </div>
        </Table.Cell>
        <Table.Cell>
        <Form.Field>
            <Select placeholder='Select' className="small" options={countryOptions} />
            </Form.Field>
         </Table.Cell>
         <Table.Cell> 
           <a href="" > <i aria-hidden="true" className="trash alternate outline icon"></i></a>
         </Table.Cell> 
      </Table.Row>
    </Table.Body>
  </Table>
</Grid.Column>

</Grid.Row>
</Grid>
<Button size='mini' className="disabled" onClick={() => setOpen(false)}>
          Skip
        </Button>
        <div className="float-area">
        <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
      <Button
          content="Submit" 
          onClick={() => setOpen(false)}
          positive
          size='mini' className="grey-btn"
        />

        </div>
     
      </Form>
     
      
      </Tab.Pane>
    }
     
  ]
  

    
  return (
    <div id="navbar">
    <Modal className="modal_media"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">edit</Button> }
    >
      <Modal.Header><h3>Edit Project </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            

        <Modal.Description>
          
        </Modal.Description>
           
            </div>
        
       
      </Modal.Content>
      <Modal.Actions>
    
        
      </Modal.Actions>

  

    </Modal>
  </div>
  
  )
}

export default EditProject
 