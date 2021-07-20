import React, { useState } from 'react';

import './../../../assets/style/index.scss'
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon, Message } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import EmailValidator from 'email-validator';
/* eslint-disable-next-line */
export interface LoginProps {
  emailSubmitHandle?
  email?
  isEmailExist?
  setIsEmailExist?
}

export function Loginbar(props: LoginProps) {
  const [email, setEmail] = useState('');
  const description = [
  ]
  const handleLogin = () => {
    if (email?.length)
      props.emailSubmitHandle();
    else {
      props.setIsEmailExist(false);
    }
  }
  const handleChange = e => {
    const { name, value } = e.target;
    props.email(value);
    setEmail(value);
  };
  return (
    <div className=" ">
      <div className="main-outer-area">
        <Grid className="ui-login">
          <Grid.Row columns={2}  >
            <Grid.Column>
              <Segment>
                <div className="ln-form-outer">
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/Shape 2.png`} alt='' />
                  <div className="form-header">
                    <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                  </div>
                  {!props.isEmailExist ? <Message error content="Email does not exists"></Message> : null}
                  <div className="form-inner">
                    <Form>
                      <Form.Field className="login-password">
                        <Input placeholder='example@domain.com' className="full-width paratext1" icon='at' name="salary"
                          onChange={handleChange}
                          type="email"
                          value={email}
                        />
                      </Form.Field>
                      <Button onClick={handleLogin} size='large' className="primary btn-large">Continue <Icon name='arrow right' />   </Button>
                      <span> <br /> <a href="/auth/registration" className="blue_color form-link"> Register with us</a>  </span>
                      <span className="float_right ">   <a href="/recovery" className="blue_color form-link"> Forgot Password ?</a>  </span>
                    </Form>
                  </div>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/slider.png`} className="massive" alt='' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Loginbar;
