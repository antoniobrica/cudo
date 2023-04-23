import React, { useEffect, useState } from 'react';
import { Button, Select, Modal, Tab, Table, Input, Form, Grid, Image, Segment, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';

import img from 'libs/shared-components/src/user_profile.png';
// import  } from '@oryd/kratos-client';

interface IFields {
  name: string;
  type: string;
  value: string;
  required: boolean;
}

export interface UserProfileProps {
  image?;
  history?;
  cancel?;
  update?;
  action?;
  fields?: IFields[];
  messages?;
}
export function UserProfile(props: UserProfileProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState<IFields>();
  const [lastName, setLastName] = useState<IFields>();
  const [csrf_token, setcsrf_token] = useState<IFields>();
  const [email, setEmail] = useState<IFields>();
  const [password, setPassword] = useState<IFields>();
  const [company_name, setCompany_name] = useState<IFields>();
  const [phone_number, setPhone_number] = useState<IFields>();
  const [address_line_1, setAddress_line_1] = useState<IFields>();
  const [address_line_2, setAddress_line_2] = useState<IFields>();
  const [city, setCity] = useState<IFields>();
  const [country_code, setCountry_code] = useState<IFields>();
  const [state_pin, setState_pin] = useState<IFields>();
  const [country, setCountry] = useState<IFields>();
  useEffect(() => {
    props?.fields?.map((field) => {
      switch (field.name) {
        case 'csrf_token':
          setcsrf_token(field);
          break;
        case 'traits.email':
          setEmail(field);
          break;
        case 'password':
          setPassword(field);
          break;
        case 'traits.name.first':
          setFirstName(field);
          break;
        case 'traits.name.last':
          setLastName(field);
          break;
        case 'traits.company.company_name':
          setCompany_name(field);
          break;
        case 'traits.phone.country_code':
          setCountry_code(field);
          break;
        case 'traits.phone.phone_number':
          setPhone_number(field);
          break;
        case 'traits.address.address_line_1':
          setAddress_line_1(field);
          break;
        case 'traits.address.address_line_2':
          setAddress_line_2(field);
          break;
        case 'traits.address.city':
          setCity(field);
          break;
        case 'traits.address.state_pin':
          setState_pin(field);
          break;
        case 'traits.address.country':
          setCountry(field);
          break;
        default:
          break;
      }
    });
  }, []);
  return (
    <div
      className="app-content-body-dash dash_area navbar-collapse box-shadow bg-white-only"
      style={{ background: '#e6e6e6' }}
    >
      <div style={{ background: '#fff', padding: '10px' }}>
        <span className="preliminary-font">User Profile</span>
      </div>
      <Grid columns={2}>
        <Grid.Column>
          <div className="card card-custom gutter-b">
            <div className="card-body">
              <img src={img} />
              <br />
              <label className="text-center">Change Picture</label>
              <Input type="file" className="file-upload-input" placeholder="Firstname" />
            </div>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className="card card-custom gutter-b widthcard">
            <div className="card-body">
              {props.action && (
                <Form action={props.action} method="POST">
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field key={firstName?.name}>
                          <label>First Name </label>
                          <Input
                            placeholder="Firstname"
                            size="small"
                            className="full-width"
                            type={firstName?.type}
                            name={firstName?.name}
                            defaultValue={firstName?.value as any}
                            required
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field key={lastName?.name}>
                          <label>Last Name </label>
                          <Input
                            placeholder="Last Name "
                            size="small"
                            className="full-width"
                            type={lastName?.type}
                            name={lastName?.name}
                            defaultValue={lastName?.value as any}
                            required={lastName?.required}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field key={email?.name}>
                          <label>Email Address</label>
                          <Input
                            placeholder="Email Address"
                            size="small"
                            className="full-width  "
                            type={email?.type}
                            name={email?.name}
                            defaultValue={email?.value as any}
                            required={email?.required}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Phone Number </label>
                          <Grid columns={2}>
                            <Grid.Row>
                              <Grid.Column>
                                <Form.Field key={country_code?.name}>
                                  <Select
                                    placeholder="Select"
                                    className="small"
                                    options={countryOptions}
                                    type={country_code?.type}
                                    name={country_code?.name}
                                    defaultValue={country_code?.value as any}
                                    required={country_code?.required}
                                  />
                                </Form.Field>
                              </Grid.Column>
                              <Grid.Column>
                                <Form.Field key={phone_number?.name}>
                                  <Input
                                    placeholder="Phone Number "
                                    size="small"
                                    className="full-width"
                                    type={phone_number?.type}
                                    name={phone_number?.name}
                                    defaultValue={phone_number?.value as any}
                                    required={phone_number?.required}
                                  />
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
                        <Form.Field key={csrf_token?.name}>
                          <Input
                            placeholder="Email Address"
                            size="small"
                            className="full-width  "
                            type={csrf_token?.type}
                            name={csrf_token?.name}
                            defaultValue={csrf_token?.value as any}
                            required={csrf_token?.required}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Company Name</label>
                          <Input
                            placeholder="Company Name"
                            size="small"
                            className="full-width  "
                            type={company_name?.type}
                            name={company_name?.name}
                            defaultValue={company_name?.value as any}
                            required
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Address Line 1</label>
                          <Input
                            placeholder="Address Line 1 "
                            size="small"
                            className="full-width"
                            type={address_line_1?.type}
                            name={address_line_1?.name}
                            defaultValue={address_line_1?.value as any}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Address Line 2</label>
                          <Input
                            placeholder="Address Line 2"
                            size="small"
                            className="full-width"
                            type={address_line_2?.type}
                            name={address_line_2?.name}
                            defaultValue={address_line_2?.value as any}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={4}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>City</label>
                          <Input
                            placeholder="City "
                            size="small"
                            className="full-width"
                            type={city?.type}
                            name={city?.name}
                            defaultValue={city?.value as any}
                            required={city?.required}
                          />
                        </Form.Field>
                      </Grid.Column>
                      {/* <Grid.Column>
                          <Form.Field>
                            <label>State</label>
                            <Input placeholder='State' size='small' className="full-width" type={state?.type}
                              name={state_pin?.name}
                              defaultValue={state_pin?.value as any}
                              {...state_pin?.required} />
                          </Form.Field>
                        </Grid.Column> */}
                      <Grid.Column>
                        <Form.Field>
                          <label>Zip</label>
                          <Input
                            placeholder="Zip"
                            size="small"
                            className="full-width"
                            type={state_pin?.type}
                            name={state_pin?.name}
                            defaultValue={state_pin?.value as any}
                            required={state_pin?.required}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Country</label>
                          <Select
                            placeholder="Select"
                            className="small"
                            options={countryOptions}
                            type={state_pin?.type}
                            name={state_pin?.name}
                            defaultValue={state_pin?.value as any}
                            required={state_pin?.required}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <Button type="submit" content="update" size="mini" className="grey-btn" />
                          <Button onClick={props.cancel} size="mini" className="icon-border">
                            X Cancel{' '}
                          </Button>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default UserProfile;
