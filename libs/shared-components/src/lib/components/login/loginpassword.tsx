import React, { useEffect, useState } from 'react';

import '../../../style/index.scss';
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon } from 'semantic-ui-react'
import logo from 'libs/shared-components/src/slider.png';
import img from 'libs/shared-components/src/Shape 2.png';
import img3 from 'libs/shared-components/src/green_tick.png';
import img4 from 'libs/shared-components/src/company2.png';
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
      console.log(field.name)
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
  // const handleLogin = () => {
  //   props.login();
  // }
  return (
    <div className=" ">
      <div className="main-outer-area">
        <Grid className="ui-login">
          <Grid.Row columns={2}  >
            <Grid.Column>
              <Segment>
                <div className="ln-form-outer">
                  <img src={img} />
                  <div className="form-header">
                    <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                    {props.messages && <Messagebar error={props.messages} />}
                  </div>
                  <div className="form-inner">
                    <Form action={props.action} method="POST">
                      <Form.Field className="login-user" key={email?.name}>
                        <label>Email Address</label>
                        <label><img src={img4} className="img-src" /> </label>  <label>
                          <span><img src={img3} className="img-src" /> </span>
                          <span className="float-area">
                            <i className="ms-Icon ms-Icon--Accounts" aria-hidden="true"></i> </span> </label>
                        <Input placeholder='Email Address' size='small' className="full-width  " name={email?.name} defaultValue={email?.value as any} readOnly />
                      </Form.Field>
                      <Form.Field key={password?.name}>
                        <Input placeholder='password' className="full-width" icon='lock' type={password?.type}
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
                      <Button size='large' className="grey-btn btn-large" type="submit">Login <Icon name='arrow right' />   </Button>
                    </Form>
                  </div>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <img src={logo} className="massive" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Loginpassword;
