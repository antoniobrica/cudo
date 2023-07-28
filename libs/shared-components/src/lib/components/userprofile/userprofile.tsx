import { radios } from '@storybook/addon-knobs';
import React, { useEffect, useState } from 'react';
import { Button, Select, Modal, Tab, Table, Input, Form, Grid, Image, Segment, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { FormField } from '@oryd/kratos-client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

export interface UserProfileProps {
  image?
  history?
  cancel?
  update?
  action?
  fields?
  messages?
}
export function UserProfile(props: UserProfileProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ]
  const [open, setOpen] = React.useState(false)
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
  const {t} = useTranslation()
  useEffect(() => {
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
    <div className="app-content-body-dash dash_area navbar-collapse box-shadow bg-white-only" style={{ background: '#e6e6e6' }}>
      <div style={{ background: '#fff', padding: '10px' }}>
        <span className="preliminary-font">>{t('menu.profile.user_profile')}</span>
      </div>
      <Grid columns={2}>
        <Grid.Column>
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
              {props.action &&
                <Form action={props.action} method="POST">
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field key={firstName?.name}>
                          <label>{t('register.first_name')} </label>
                          <Input placeholder={t('register.first_name')} size='small' className="full-width" type={firstName?.type}
                            name={firstName?.name}
                            defaultValue={firstName?.value as any}
                            {...firstName?.required} />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field key={lastName?.name}>
                          <label>{t('register.last_name')} </label>
                          <Input placeholder={t('register.last_name')} size='small' className="full-width" type={lastName?.type}
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
                          <label>{t('register.email')}</label>
                          <Input placeholder={t('register.email')} size='small' className="full-width  " type={email?.type}
                            name={email?.name}
                            defaultValue={email?.value as any}
                            {...email?.required} />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t('register.phone')} </label>
                          <Grid columns={2}>
                            <Grid.Row>
                              <Grid.Column>
                                <Form.Field key={country_code?.name}>
                                  <Select clearable placeholder={t('common.select')} className="small" options={countryOptions} type={country_code?.type}
                                    name={country_code?.name}
                                    defaultValue={country_code?.value as any}
                                    {...country_code?.required} />
                                </Form.Field>
                              </Grid.Column>
                              <Grid.Column>
                                <Form.Field key={phone_number?.name}>
                                  <Input placeholder={t('register.phone')} size='small' className="full-width" type={phone_number?.type}
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
                        <Form.Field key={csrf_token?.name}>
                          <Input placeholder={t('register.email')} size='small' className="full-width  " type={csrf_token?.type}
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
                          <label>{t("register.company_name")}</label>
                          <Input placeholder={t("register.company_name")} size='small' className="full-width  " type={company_name?.type}
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
                          <label>{t("register.address1")}</label>
                          <Input placeholder={t("register.address1")} size='small' className="full-width" type={address_line_1?.type}
                            name={address_line_1?.name}
                            defaultValue={address_line_1?.value as any}
                            {...address_line_1?.required} />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("register.address2")}</label>
                          <Input placeholder={t("register.address2")} size='small' className="full-width" type={address_line_2?.type}
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
                          <label>{t("register.city")}</label>
                          <Input placeholder={t("register.city")} size='small' className="full-width" type={city?.type}
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
                          <label>{t("register.zip")}</label>
                          <Input placeholder={t("register.zip")} size='small' className="full-width" type={state_pin?.type}
                            name={state_pin?.name}
                            defaultValue={state_pin?.value as any}
                            {...state_pin?.required} />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>{t("register.country")}</label>
                          <Select clearable placeholder={t("common.select")} className="small" options={countryOptions} type={state_pin?.type}
                            name={state_pin?.name}
                            defaultValue={state_pin?.value as any}
                            {...state_pin?.required} />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <Button type="submit"
                            content={t("project_tab_menu.task.update")}
                            size='small' className="primary"
                          />
                          <Button onClick={props.cancel} size='small' className="icon-border"  >
                            X  {t("common.cancel")} </Button>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>}
            </div >
          </div >
        </Grid.Column >
      </Grid >
    </div >
  )
}

export default UserProfile
