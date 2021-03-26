import React, { useState } from 'react';

import '../../../style/index.scss';
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon } from 'semantic-ui-react'
import logo from 'libs/shared-components/src/slider.png';
import img from 'libs/shared-components/src/Shape 2.png';
/* eslint-disable-next-line */
export interface LoginProps {
  emailSubmitHandle
  email
}

export function Loginbar(props: LoginProps) {
  const [email, setEmail] = useState('');
  const description = [
  ]
  const handleLogin = () => {
    props.emailSubmitHandle();
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
                  <img src={img} alt='' />
                  <div className="form-header">
                    <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                  </div>
                  <div className="form-inner">
                    <Form>
                      <Form.Field>
                        <Input placeholder='example@domain.com' className="full-width" icon='at' name="salary"
                          onChange={handleChange}
                          type="email"
                          value={email} />
                      </Form.Field>
                      <Button onClick={handleLogin} size='large' className="grey-btn btn-large">Continue <Icon name='arrow right' />   </Button>
                      <span> <br /> <a href="" className="blue_color"> Register with us</a>  </span>

                      <span className="float_right ">   <a href="" className="blue_color"> Forgot Password ?</a>  </span>
                    </Form>
                  </div>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <img src={logo} className="massive" alt='' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Loginbar;
