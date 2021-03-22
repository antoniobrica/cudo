import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LoginFlow } from "@oryd/kratos-client"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { register } from "../services/auth"
import config from "../config/kratos"
import { Button } from "semantic-ui-react"

export const Login = () => {
  const [requestResponse, setRequestResponse] = useState<LoginFlow>()

  useEffect(() => {
    const request = initialiseRequest({ type: "login" }, { filterid: "flow" }) as Promise<LoginFlow>
    request
      .then(request => setRequestResponse(request))
      .catch((error) => {
        console.log(error);
      })
  }, [setRequestResponse])

  const messages = requestResponse?.messages
  const form = requestResponse?.methods?.password?.config

  return (
    <div className="main-outer-area">
      <div className="ui-login">
        <div className="alternative-actions">
          <p>
            <Button size='large' className="grey-btn btn-large" onClick={() => register({ setReferer: false })} >
              Register new account
            </Button>
          </p>
          <p>
            <Link to={config.routes.recovery.path}>Reset password</Link>
          </p>
        </div>

        <div id="login-password">
          {messages && <KratosMessages messages={messages} />}
          {form &&
            <KratosForm
              submitLabel="Sign in"
              action={form.action}
              fields={form.fields}
              messages={form.messages} />}
        </div>
      </div>
    </div>
  )
}
