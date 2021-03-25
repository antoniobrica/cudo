import React from 'react';
 
import '../../../style/index.scss';
import {Select, Input, Segment,Form, Grid ,Image,Checkbox,Button,Icon } from 'semantic-ui-react'
import logo from 'libs/shared-components/src/slider.png';
import img from 'libs/shared-components/src/Shape 2.png';
/* eslint-disable-next-line */
export interface LoginProps { }

export function RegisterPage(props: LoginProps) {
 
    const description = [
         
      ] 
      const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]
  return (
    <div className="app-content-body ">
        
        <div className="main-outer-area">
 
            <Grid className="ui-login" columns={1} >
                    
            <Grid.Row  >
      <Grid.Column >
            
             <div className="ln-form-outer">
             
             <img src={img}   />
                    <div className="form-header">
                     
                    <h2 className="login">Register your account</h2>
                    
                    </div>

                    <div className="form-inner">

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
      <Input placeholder='Email Address' size='small' className="full-width  " type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Phone Number </label>
      <Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <Select placeholder='Select' className="small" options={countryOptions} /> 
      </Form.Field>
      </Grid.Column>
      <Grid.Column>
    <Form.Field>
     <Input placeholder='Phone Number ' size='small' className="full-width" type="text" />
      </Form.Field>
      </Grid.Column>
      </Grid.Row>
      </Grid>
    
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid columns={2}>
<Grid.Row>
    <Grid.Column>
    <Form.Field>
      <label> Password</label>
      <Input placeholder='new password' size='small' className="full-width  " type="password" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Re-Enter Password</label>
      <Input placeholder='Re-enter password' size='small' className="full-width  " type="password" />
    </Form.Field>
  </Grid.Column>
 </Grid.Row>
</Grid>
<Grid >
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Company Name</label>
      <Input placeholder='Company Name' size='small' className="full-width  " type="text" />
    </Form.Field>
  </Grid.Column>
 </Grid.Row>
</Grid>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Address Line 1</label>
      <Input placeholder='Address Line 1 ' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Address Line 2</label>
      <Input placeholder='Address Line 2' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>

<Grid columns={4}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>City</label>
      <Input placeholder='City ' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>State</label>
      <Input placeholder='State' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Zip</label>
      <Input placeholder='Zip' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
      <label>Country</label>
     
    <Select placeholder='Select' className="small" options={countryOptions} />
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<button className="ui large button grey-btn btn-large">Register <i aria-hidden="true" className="arrow right icon"></i>   </button>


    </Form>
                 </div>  

              </div>
        
            </Grid.Column>

             
           
            </Grid.Row>
             
            </Grid>
 
          
        </div>

        

    </div>
        
    
 
  );
}

export default RegisterPage;
