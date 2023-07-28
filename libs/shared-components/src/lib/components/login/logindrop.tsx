import React from 'react';

import './../../../assets/style/index.scss'
import { Select, Input, Segment, Form, Grid, Image, Checkbox, Button, Icon, Dropdown } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface LoginDropProps {
  login?
  email?
  companies?
  selectedCompany?
}

export function Logindrop(props: LoginDropProps) {
  const {t} = useTranslation()
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
                    <span className="welcome">{t("login.greet")}</span>
                    <h2 className="login">{t("login.logindrop_title")}</h2>
                  </div>
                  <div className="form-inner">
                    <Form>
                      <Form.Field className="login-user email-filled">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} className="img-src" />
                          <span className="email-text">{props.email}</span>
                          <i className="ms-Icon ms-Icon--Accounts" aria-hidden="true"></i>
                      </Form.Field>
                      <Form.Field className="form-dropdown">
                        <Dropdown
                          placeholder={t("login.dropdown_placeholder")}
                          fluid
                          selection
                          options={props?.companies}
                          onChange={handleOnChange}
                          size="small"
                        />
                        {/* <Select placeholder='Select Company' options={props?.companies} defaultValue={props?.companies[0]?.value} className="full-width" /> */}
                      </Form.Field>
                      <Button onClick={handleLogin} size='large' className="primary btn-large">{t("common.continue")} <Icon name='arrow right' />   </Button>
                      <span> <br /> <a href="/auth/registration" className="blue_color form-link"> {t("login.register_link")}</a>  </span>
                      <span className="float_right ">   <a href="/recovery" className="blue_color form-link"> {t("login.forgot_password_link")} ?</a>  </span>
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
