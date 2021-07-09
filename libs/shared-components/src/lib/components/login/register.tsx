import React, { useEffect, useState } from 'react';

import './../../../assets/style/index.scss'
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { FormField, Message } from "@oryd/kratos-client"

export interface RegisterProps {
  action?
  fields?
  messages?
  login?
}

export function RegisterPage(props: RegisterProps) {
  const description = [
  ]
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ]
  const [firstName, setFirstName] = useState({} as FormField);
  const [lastName, setLastName] = useState({} as FormField);
  const [csrf_token, setcsrf_token] = useState({} as FormField);
  const [email, setEmail] = useState({} as FormField);
  const [password, setPassword] = useState({} as FormField);
  const [company_name, setCompany_name] = useState({} as FormField);
  const [phone_number, setPhone_number] = useState({} as FormField);
  const [address_line_1, setAddress_line_1] = useState({} as FormField);
  const [address_line_2, setAddress_line_2] = useState({} as FormField);
  const [city, setCity] = useState({} as FormField);
  const [country_code, setCountry_code] = useState({} as FormField);
  const [state_pin, setState_pin] = useState({} as FormField);
  const [country, setCountry] = useState({} as FormField);
  useEffect(() => {
    console.log("RegisterPage called");
    props?.fields?.map(field => {
      switch (field.name) {
        case "csrf_token":
          setcsrf_token(field);
          break;
        case "traits.email":
          setEmail(field);
          break;
        case "password":
          setPassword(field);
          break;
        case "traits.name.first":
          setFirstName(field);
          break;
        case "traits.name.last":
          setLastName(field);
          break;
        case "traits.company.company_name":
          setCompany_name(field);
          break;
        case "traits.phone.country_code":
          setCountry_code(field);
          break;
        case "traits.phone.phone_number":
          setPhone_number(field);
          break;
        case "traits.address.address_line_1":
          setAddress_line_1(field);
          break;
        case "traits.address.address_line_2":
          setAddress_line_2(field);
          break;
        case "traits.address.city":
          setCity(field);
          break;
        case "traits.address.state_pin":
          setState_pin(field);
          break;
        case "traits.address.country":
          setCountry(field);
          break;
        default:
          break;
      }
    }
    )
  }, [])
  return (
    <div className="app-content-body ">
      <div className="main-outer-area">
        <Grid className="ui-login" columns={1} >
          <Grid.Row  >
            <Grid.Column >
              <div className="ln-form-outer">
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/Shape 2.png`} />
                <div className="form-header">
                  <h2 className="login">Register your account</h2>
                </div>
                <div className="form-inner">
                  {props.action &&
                    <Form action={props.action} method="POST">
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field key={firstName?.name}>
                              <label>First Name </label>
                              <Input placeholder='Firstname' size='small' className="full-width" type={firstName?.type}
                                name={firstName?.name}
                                defaultValue={firstName?.value as any}
                                {...firstName?.required} />
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field key={lastName?.name}>
                              <label>Last Name </label>
                              <Input placeholder='Last Name ' size='small' className="full-width" type={lastName?.type}
                                name={lastName?.name}
                                defaultValue={lastName?.value as any}
                                {...lastName?.required} />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field key={email?.name}>
                              <label>Email Address</label>
                              <Input placeholder='Email Address' size='small' className="full-width  " type={email?.type}
                                name={email?.name}
                                defaultValue={email?.value as any}
                                {...email?.required} />
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                              <label>Phone Number </label>
                              <Grid columns={2}>
                                <Grid.Row>
                                  <Grid.Column>
                                    <Form.Field key={country_code?.name}>
                                      <Select placeholder='Select' className="small" options={countryOptions} type={country_code?.type}
                                        name={country_code?.name}
                                        defaultValue={country_code?.value as any}
                                        {...country_code?.required} />
                                    </Form.Field>
                                  </Grid.Column>
                                  <Grid.Column>
                                    <Form.Field key={phone_number?.name}>
                                      <Input placeholder='Phone Number ' size='small' className="full-width" type={phone_number?.type}
                                        name={phone_number?.name}
                                        defaultValue={phone_number?.value as any}
                                        {...phone_number?.required} />
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
                            <Form.Field key={password?.name}>
                              <label>Password</label>
                              <Input placeholder='Password' size='small' className="full-width  " type={password?.type}
                                name={password?.name}
                                defaultValue={password?.value as any}
                                {...password?.required} />
                            </Form.Field>
                            <Form.Field key={csrf_token?.name}>
                              <Input placeholder='Email Address' size='small' className="full-width  " type={csrf_token?.type}
                                name={csrf_token?.name}
                                defaultValue={csrf_token?.value as any}
                                {...csrf_token?.required} />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid >
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>
                              <label>Company Name</label>
                              <Input placeholder='Company Name' size='small' className="full-width  " type={company_name?.type}
                                name={company_name?.name}
                                defaultValue={company_name?.value as any}
                                {...company_name?.required} />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>
                              <label>Address Line 1</label>
                              <Input placeholder='Address Line 1 ' size='small' className="full-width" type={address_line_1?.type}
                                name={address_line_1?.name}
                                defaultValue={address_line_1?.value as any}
                                {...address_line_1?.required} />
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                              <label>Address Line 2</label>
                              <Input placeholder='Address Line 2' size='small' className="full-width" type={address_line_2?.type}
                                name={address_line_2?.name}
                                defaultValue={address_line_2?.value as any}
                                {...address_line_2?.required} />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid columns={4}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>
                              <label>City</label>
                              <Input placeholder='City ' size='small' className="full-width" type={city?.type}
                                name={city?.name}
                                defaultValue={city?.value as any}
                                {...city?.required} />
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
                              <Input placeholder='Zip' size='small' className="full-width" type={state_pin?.type}
                                name={state_pin?.name}
                                defaultValue={state_pin?.value as any}
                                {...state_pin?.required} />
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                              <label>Country</label>
                              <Select placeholder='Select' className="small" options={countryOptions} type={state_pin?.type}
                                name={state_pin?.name}
                                defaultValue={state_pin?.value as any}
                                {...state_pin?.required} />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <button type="submit" className="ui large button grey-btn btn-large">Register <i aria-hidden="true" className="arrow right icon"></i></button>
                    </Form>
                  }</div>
                <button onClick={props.login} className="ui large button grey-btn btn-large">Login <i aria-hidden="true" className="arrow right icon"></i></button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
export default RegisterPage;
