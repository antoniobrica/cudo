import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Select, Modal, Tab, Table, Input, Form, Grid, Image, Segment, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';

import img from 'libs/shared-components/src/user_profile.png';
import img5 from 'libs/shared-components/src/edit.png';

export function UserProfileView() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]


  const [open, setOpen] = React.useState(false)

  return (
    <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only" style={{ background: '#e6e6e6' }}>
      <div style={{ background: '#fff', padding: '10px' }}>
        <span className="preliminary-font">User Profile</span>

      </div>
      <Grid columns={4}>
        <Grid.Column>


          <div className="card card-custom gutter-b">

            <div className="card-body">
              <img src={img} /><br />
              <label className="text-center">Change Picture</label>
              <Input type="file" className="file-upload-input" placeholder='Firstname' />

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
                        <label>John  </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>Last Name </label>
                        <label>  Smith  </label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Email Address</label>
                        <label>johnsmith@gmail.com </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>Phone Number </label>
                        <label>+1 987 325 9875 </label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Old Passord</label>
                        <label>1111d</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>New Passord</label>
                        <label>1111d</label>
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
                <Grid >
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Company Name</label>
                        <label>Kiran Construction Co</label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Address Line 1</label>

                        <label> 532 68th Street</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>Address Line 2</label>
                        <label> </label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>City</label>
                        <label>New York</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>State</label>
                        <label>NY</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>Zip</label>
                        <label>10605-78 156 </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>Country</label>
                        <label>USA</label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <button className="ui mini button edit_btn">  <img src={img5} /> Edit</button>

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

export default UserProfileView
