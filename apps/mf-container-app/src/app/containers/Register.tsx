import React, { useEffect, useState } from "react"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { login } from "../services/auth"
import { Button, Form, Grid, Header, Input, TextArea } from "semantic-ui-react"
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
export const Register = () => {
  const [requestResponse, setRequestResponse] = useState<any>()

  useEffect(() => {
    const request = initialiseRequest({ type: "register" }, { filterid: "flow" }) as Promise<any>
    request
      .then(request => setRequestResponse(request))
      .catch((error) => { console.log(error) })
  }, [setRequestResponse])

  const form = requestResponse?.methods?.password?.config
  const messages = requestResponse?.messages
  const onCountry = (data) => {
    console.log('selected_country', data)
    setCountry(data.value)
  }
  return (
    <div className="auth">
      <div className="container">
        <div className="alternative-actions">
          <p>
            <Button size='large' className="grey-btn btn-large" onClick={() => login({ setReferer: false })}>
              Already have an account? Log in instead
            </Button>
          </p>
        </div>

        <div id="registration-password">
          {messages && <KratosMessages messages={messages} />}
          {form &&
            <KratosForm
              submitLabel="Sign up"
              action={form.action}
              fields={form.fields}
              messages={form.messages} />}
        </div>
        {/* <div>
          <div>
            <Header className="header" >Address Information</Header>
          </div>
          <Form>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <label>Address Line 1  </label>
                    <Input
                      placeholder='Default' size='small' className="full-width" type="text"
                    // value={adressLine1}
                    // onChange={onAdressLine1}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <label>Address Line 2   </label>
                    <Input
                      placeholder='Default' size='small' className="full-width" type="text"
                    // value={adressLine2}
                    // onChange={onAdressLine2}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid columns={4}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <label>City</label>
                    <Input
                      placeholder='Default' size='small' className="full-width" type="text"
                    // value={city}
                    // onChange={onCity}
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <label>State</label>
                    <Input
                      placeholder='Default' size='small' className="full-width" type="text"
                    // value={state}
                    // onChange={onState}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label>Zip</label>
                    <Input
                      placeholder='Default' size='small' className="full-width" type="text"
                    // value={zip}
                    // onChange={onZip}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <MfAccountAppLib parentCallback={onCountry} />
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Form>
        </div> */}
      </div>
    </div>
  )
}
