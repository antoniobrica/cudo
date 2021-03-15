import React, { useEffect, useState } from "react"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { login } from "../services/auth"
import { Button } from "semantic-ui-react"

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
      </div>
    </div>
  )
}
