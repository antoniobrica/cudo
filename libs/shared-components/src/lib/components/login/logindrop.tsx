import React from 'react';

import './../../../assets/style/index.scss'
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon, Dropdown } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface LoginDropProps {
  login?
  email?
  companies?
  selectedCompany?
}

export function Logindrop(props: LoginDropProps) {
  const handleLogin = () => {
    props.login();
  }
  const description = [

  ]
  const handleOnChange = (e, data) => {
    props.selectedCompany(data.value);
  }
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
                    <h2 className="login">Select your company</h2>
                  </div>
                  <div className="form-inner">
                    <Form>
                      <Form.Field className="login-user">
                        <label>  <span><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} className="img-src" /> </span> <span>{props.email}  </span><span className="float-area">
                          <i className="ms-Icon ms-Icon--Accounts" aria-hidden="true"></i> </span> </label>
                      </Form.Field>
                      <Form.Field>
                        <Dropdown
                          placeholder='Please select'
                          fluid
                          selection
                          options={props?.companies}
                          onChange={handleOnChange}
                        />
                        {/* <Select placeholder='Select Company' options={props?.companies} defaultValue={props?.companies[0]?.value} className="full-width" /> */}
                      </Form.Field>
                      <Button onClick={handleLogin} size='large' className="primary btn-large">Continue <Icon name='arrow right' />   </Button>
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

export default Logindrop;
