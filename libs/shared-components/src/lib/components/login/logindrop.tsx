import React from 'react';

import '../../../assets/style/index.scss';
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon } from 'semantic-ui-react';
import logo from 'libs/shared-components/src/slider.png';
import img from 'libs/shared-components/src/Shape 2.png';
import img3 from 'libs/shared-components/src/green_tick.png';
import img4 from 'libs/shared-components/src/company1.png';

/* eslint-disable-next-line */
export interface LoginDropProps {
  login?;
  email?;
  companies?;
  selectedCompany?;
}

export function Logindrop(props: LoginDropProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
  ];
  const handleLogin = () => {
    props.login();
  };
  const description = [];
  const friendOptions = [
    {
      key: 'Company 1',
      text: 'Company 1',
      value: 'Company 1',
      image: img4,
    },
    {
      key: 'Company 2',
      text: 'Company 2',
      value: 'Company 2',
      image: img4,
    },
  ];
  return (
    <div className=" ">
      <div className="main-outer-area">
        <Grid className="ui-login">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <div className="ln-form-outer">
                  <img src={img} />
                  <div className="form-header">
                    <span className="welcome">Welcome Back</span>
                    <h2 className="login">Select your company</h2>
                  </div>
                  <div className="form-inner">
                    <Form>
                      <Form.Field className="login-user">
                        <label>
                          {' '}
                          <span>
                            <img src={img3} className="img-src" />{' '}
                          </span>{' '}
                          <span>{props.email} </span>
                          <span className="float-area">
                            <i className="ms-Icon ms-Icon--Accounts" aria-hidden="true"></i>{' '}
                          </span>{' '}
                        </label>
                      </Form.Field>
                      {/* <Form.Field>
                        <Select placeholder='Select Company' options={friendOptions} defaultValue={friendOptions[0].value} className="full-width" />
                      </Form.Field> */}
                      <Button onClick={handleLogin} size="large" className="grey-btn btn-large">
                        Continue <Icon name="arrow right" />{' '}
                      </Button>
                      <span>
                        {' '}
                        <br />{' '}
                        <a href="/auth/registration" className="blue_color">
                          {' '}
                          Register with us
                        </a>{' '}
                      </span>
                      <span className="float_right ">
                        {' '}
                        <a href="/recovery" className="blue_color">
                          {' '}
                          Forgot Password ?
                        </a>{' '}
                      </span>
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

export default Logindrop;
