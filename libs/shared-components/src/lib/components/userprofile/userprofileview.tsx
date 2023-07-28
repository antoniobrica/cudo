import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Select, Modal, Tab, Table, Input, Form, Grid, Image, Segment, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
// import { initI18n } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
import { MS_SERVICE_URL } from '@cudo/mf-core';
// const defaultLanguage = 'en-GB';
// const supportedLanguages = [defaultLanguage, 'en-GB'];
// initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);
export interface UserProfileEditProps {
  edit?
}
export function UserProfileView(props: UserProfileEditProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ]

  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation();
  return (
    <div className="app-content-body-dash dash_area navbar-collapse box-shadow bg-white-only" style={{ background: '#e6e6e6' }}>
      <div style={{ background: '#fff', padding: '10px' }}>
        <span className="preliminary-font">{t('menu.profile.user_profile')}</span>
      </div>
      <Grid columns={2}>
        <Grid.Column style={{ height: '243px;' }}>
          <div className="card card-custom gutter-b">
            <div className="card-body">
              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user_profile.png`} /><br />
              <label className="text-center">{t("menu.profile.change_picture")}</label>
              <Input type="file" className="file-upload-input" placeholder='Firstname' />
            </div>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className="card card-custom gutter-b widthcard" >
            <div className="card-body">
              <Form>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t('register.first_name')} </label>
                        <label>John  </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t('register.last_name')} </label>
                        <label>  Smith  </label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t('register.email')}</label>
                        <label>johnsmith@gmail.com </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t('register.phone')} </label>
                        <label>+1 987 325 9875 </label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("menu.profile.old_password")}</label>
                        <label>1111d</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("menu.profile.new_password")}</label>
                        <label>1111d</label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid >
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.company_name")}</label>
                        <label>Kiran Construction Co</label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.address1")}</label>
                        <label> 532 68th Street</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.address2")}</label>
                        <label> </label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={4}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.city")}</label>
                        <label>New York</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("project_list.add_new_project.state")}</label>
                        <label>NY</label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.zip")}</label>
                        <label>10605-78 156 </label>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.country")}</label>
                        <label>USA</label>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <button onClick={props.edit} className="ui mini button edit_btn">  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/edit.png`} /> Edit</button>
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default UserProfileView
