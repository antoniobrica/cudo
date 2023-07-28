import React, { useState } from 'react';

import './../../../assets/style/index.scss';
import { Input, Segment, Form, Grid, Button, Icon, Message } from 'semantic-ui-react';
import img from 'libs/shared-components/src/Shape 2.png';
import logo from 'libs/shared-components/src/slider.png';
// import EmailValidator from 'email-validator';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface LoginProps {
  emailSubmitHandle?;
  email?;
  isEmailExist?;
  setIsEmailExist?;
}

export function Loginbar(props: LoginProps) {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const description = [];
  const handleLogin = () => {
    if (email?.length) props.emailSubmitHandle();
    else {
      props.setIsEmailExist(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    props.email(value);
    setEmail(value);
  };
  return (
    <div className=" ">
      <div className="main-outer-area">
        <Grid className="ui-login">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <div className="ln-form-outer">
                  <img src={img} alt="" />
                  <div className="form-header">
                    <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                    {/* <span className="welcome">{t('login.greet')}</span>
                    <h2 className="login">{t('login.form_title')}</h2> */}
                  </div>
                  {!props.isEmailExist ? (
                    <Message
                      // style={{ color: '#ff0000' }}
                      color="red"
                      error
                      // content="Email not found"
                      // content={t('login.email_error')}
                    >
                      Email not found
                    </Message>
                  ) : null}
                  <div className="form-inner">
                    <Form>
                      <Form.Field className="login-password">
                        <Input
                          placeholder="example@domain.com"
                          // className="full-width"
                          // placeholder={t('login.email_placeholder')}
                          className="full-width paratext1"
                          // icon="at"
                          // name="salary"
                          onChange={handleChange}
                          required
                          // type="email"
                          value={email}
                          // style={{color: '#000000'}}
                        />
                      </Form.Field>
                      <Button
                        onClick={handleLogin}
                        size="large"
                        className="primary btn-large"
                        style={{
                          backgroundColor: '#1660E8',
                        }}
                      >
                        Continue
                        {/* {t('common.continue')} */}
                        <Icon name="arrow right" />{' '}
                      </Button>
                      <span>
                        {' '}
                        <br />{' '}
                        <a href="/auth/registration" className="blue_color form-link">
                          {' '}
                          Register with us
                          {/* {t('login.register_link')} */}
                        </a>{' '}
                      </span>
                      <span className="float_right ">
                        {' '}
                        <a href="/recovery" className="blue_color form-link">
                          {' '}
                          Forgot Password ?{/* {t('login.forgot_password_link')} ? */}
                        </a>{' '}
                      </span>
                    </Form>
                  </div>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <img src={logo} className="massive" alt="" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Loginbar;
