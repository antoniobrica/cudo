import React from "react"
import { FormField, Message } from "@oryd/kratos-client"
import { FORM_LABELS } from "@cudo/mf-core"
import { KratosMessages } from "../components/KratosMessages"
import { Button, Form, Grid, Segment, Input, Icon } from "semantic-ui-react"

import { MS_SERVICE_URL } from '@cudo/mf-core';
import { ToEmail } from "../services/auth"

export const KratosForm = ({ action, messages = [], fields, submitLabel = "Submit" }: { action: string, messages?: Message[], fields: FormField[], submitLabel: string }) => {
  const fieldsSorted = sortFormFields({ fields })
  const login = (() => {
    ToEmail();
  })
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
                    <h2 className="login">{submitLabel}</h2>
                  </div>
                  <div className="form-inner">
                    <Form>
                      <Form.Field className="login-password">
                        <Input placeholder='example@domain.com' className="full-width paratext1" icon='at' name="email"
                          type="email"
                        />
                      </Form.Field>
                      <Button size='large' className="primary btn-large">Send recovery link <Icon name='arrow right' /></Button> 
                      <div className="center-form-link">
                        <a href='#' className="form-link">Back to Login</a>
                      </div>
                      {/* <span> <br /> <a href="/auth/registration" className="blue_color"> Register with us</a>  </span>
                      <span className="float_right ">   <a href="/recovery" className="blue_color"> Forgot Password ?</a>  </span>*/}
                    </Form>
                    {!!messages?.length && <KratosMessages messages={messages} />}
                    {action &&
                      <Form className="ln-form-outer" action={action} style={{ margin: "60px 0" }} method="POST">
                        {renderFormFields({ fields: fieldsSorted })}
                        <Button size='large' className="grey-btn btn-large" type="submit">{submitLabel}</Button>
                        <Button onClick={login} size='large' className="grey-btn btn-large">Login </Button>
                      </Form>}
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
  )
}

const sortFormFields = ({ fields }: { fields: FormField[] }) => {
  return fields.sort((current, next) => {
    const c = FORM_LABELS[current.name]?.priority || 0
    const n = FORM_LABELS[next.name]?.priority || 0
    return n - c
  })
}

const renderFormFields = ({ fields = [] }: { fields: FormField[] }) => fields.map(field => {
  const { name, type, required, value, messages = [] } = field
  const _required = required ? { required } : {}
  const _label = FORM_LABELS[name]?.label
  const style = type === "hidden" ? { display: "none" } : {}
  return (
    <fieldset key={name} style={style}>
      <label >
        <input
          type={type}
          name={name}
          defaultValue={value as any}
          {..._required} />
        {_label && <span className="float-area">{_label}</span>}
      </label>
      <KratosMessages messages={messages} />
    </fieldset>


    

  )
})
