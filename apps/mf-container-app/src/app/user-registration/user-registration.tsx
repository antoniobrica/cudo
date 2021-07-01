import React, { useEffect, useState } from "react"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { login, ToEmail } from "../services/auth"
import { Button, Form, Grid, Header, Input, Modal, TextArea } from "semantic-ui-react"
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import { RegisterPage } from "@cudo/shared-components"
import { FormField } from "@oryd/kratos-client"
/* eslint-disable-next-line */
export interface UserRegistrationProps {
}

export function UserRegistration(props: UserRegistrationProps) {
  const [requestResponse, setRequestResponse] = useState<any>()
  const [open, setOpen] = React.useState(false)
  useEffect(() => {
    const request = initialiseRequest({ type: "register" }, { filterid: "flow" }) as Promise<any>
    request
      .then(request1 => {
        setRequestResponse(request1)
      })
      .catch((error) => { console.log(error) })
  }, [setRequestResponse])

  const form = requestResponse?.methods?.password?.config
  const messages = requestResponse?.messages

  return (

    <div className="auth">
      <div className="container">
        <div id="registration-password">
          {messages && <KratosMessages messages={messages} />}
          {
            form && <RegisterPage action={form?.action} fields={form?.fields as FormField[]} messages={messages} login={ToEmail} ></RegisterPage>
          }
        </div>
      </div>
    </div>
  )
}


export default UserRegistration;
