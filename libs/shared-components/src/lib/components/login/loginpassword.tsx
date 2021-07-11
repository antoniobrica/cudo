import React, { useEffect, useState } from 'react';

import './../../../assets/style/index.scss'
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { FormField } from '@oryd/kratos-client';
import Messagebar from '../messages/messages';
/* eslint-disable-next-line */
export interface LoginPasswordProps {
  action?
  fields?
  messages?
}

export function Loginpassword(props: LoginPasswordProps) {
  const description = [
  ]
  const [csrf_token, setcsrf_token] = useState({} as FormField);
  const [email, setEmail] = useState({} as FormField);
  const [password, setPassword] = useState({} as FormField);
  useEffect(() => {
    props?.fields?.map(field => {
      switch (field.name) {
        case "csrf_token":
          setcsrf_token(field);
          break;
        case "identifier":
          field.value = localStorage.getItem('email');
          setEmail(field);
          break;
        case "password":
          setPassword(field);
          break;
        default:
          break;
      }
    }
    )
  }, [props?.fields])
  return (
    <div className=" ">
      <div className="main-outer-area">
        <Grid className="ui-login">
          <Grid.Row columns={2}  >
            <Grid.Column>
              <Segment>
                <div className="ln-form-outer">
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/Shape 2.png`} />
                  <div className="form-header">
                    <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                    {/* {props.messages && <Messagebar error={props.messages} />} */}
                  </div>
                  <div className="form-inner">
                    <Form action={props.action} method="POST">
                      <Form.Field className="login-user email-filled" key={email?.name}>
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/company2.png`} className="img-src" />
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} className="img-src" />
                        <Input placeholder='Email Address' size='small' className="full-width  " name={email?.name} defaultValue={email?.value as any} readOnly />
                        <i className="ms-Icon ms-Icon--Accounts" aria-hidden="true"></i>
                      </Form.Field>
                      <Form.Field key={password?.name} className="login-password">
                        <Input placeholder='Enter Password' className="full-width" icon='lock' type={password?.type}
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
                      <Button size='large' className="primary btn-large" type="submit">Login <Icon name='arrow right' /></Button>

                      <span> <br /> <a href="/auth/registration" className="blue_color"> Register with us</a>  </span>
                      <span className="float_right ">   <a href="/recovery" className="blue_color"> Forgot Password ?</a>  </span>
                    </Form>

                  </div>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/slider.png`} className="massive" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Loginpassword;
