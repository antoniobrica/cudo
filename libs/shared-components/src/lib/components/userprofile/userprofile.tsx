import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header,   Modal,  Tab,Table,  Input, Form, Grid, Image, Segment, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
import img from 'libs/shared-components/src/user_profile.png'; 


function UserProfile() {
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]

 
  const [open, setOpen] = React.useState(false)
   
  return (
    <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only" style={{background:'#e6e6e6'}}>
      <div style={{background:'#fff', padding:'10px'}}> 
          <span className="preliminary-font">User Profile</span>
      
         </div>
         <Grid columns={4}>
    <Grid.Column>
     
  
  <div className="card card-custom gutter-b">
 
 <div className="card-body">
 <img src={img}   /><br/>
 <label className="text-center">Change Picture</label>
 <Input  type="file" className="file-upload-input"   placeholder='Firstname' />
  
 </div>
  
    
 
</div>

    </Grid.Column>
    <Grid.Column>

    <div className="card card-custom gutter-b widthcard" >
  
 <div className="card-body">
<Form>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>First Name </label>
      <Input placeholder='Firstname' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Last Name </label>
      <Input placeholder='Last Name ' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Email Address</label>
      <Input placeholder='Email Address' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Phone Number </label>
      <Input placeholder='Phone Number ' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Address</label>
      <TextArea placeholder='Enter Address' />
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <Button
          content="update" 
          
          size='mini' className="grey-btn"
        />
        <Button size='mini' className="icon-border"  >
        X  Cancel
        </Button>
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>


    </Form>
 </div>
</div>
   
    </Grid.Column>
  </Grid>
   
  </div>

  
  )
}

export default UserProfile
 