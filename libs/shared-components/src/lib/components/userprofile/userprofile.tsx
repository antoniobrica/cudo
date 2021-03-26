import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Select, Modal, Tab, Table, Input, Form, Grid, Image, Segment, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';

import img from 'libs/shared-components/src/user_profile.png';

export interface UserProfileProps {
  image?
  history?
}
export function UserProfile(props: UserProfileProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ]


  const [open, setOpen] = React.useState(false)

  return (
    <div className="app-content-body-dash dash_area navbar-collapse box-shadow bg-white-only" style={{ background: '#e6e6e6' }}>
      <div style={{ background: '#fff', padding: '10px' }}>
        <span className="preliminary-font">User Profile</span>
      </div>
      <Grid columns={2}>
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
                        <Input placeholder='Email Address' size='small' className="full-width margin_email" type="text" />
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
                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Old Passord</label>
                        <Input placeholder='password' size='small' className="full-width  " type="password" />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>New Passord</label>
                        <Input placeholder='new password' size='small' className="full-width  " type="password" />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>Re-Enter Passord</label>
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
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Button
                          content="update"
                          size='mini' className="grey-btn"
                        />
                        <Button size='mini' className="icon-border"  >
                          X  Cancel </Button>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </div >
          </div >
        </Grid.Column >
      </Grid >
    </div >
  )
}

export default UserProfile
