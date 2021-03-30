import React, { useEffect, useState } from "react"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { Header } from "../components/Header"
import { Button, Icon } from "semantic-ui-react"
import { login, ToEmail } from "../services/auth"

export const Recover = () => {
  const [requestResponse, setRequestResponse] = useState<any>()

  useEffect(() => {
    const request = initialiseRequest({ type: "recover" }, { filterid: "flow" }) as Promise<any>
    request
      .then(request => setRequestResponse(request))
      .catch((error) => { console.log(error) })
  }, [setRequestResponse])

  const form = requestResponse?.methods?.link?.config
  const messages = requestResponse?.messages

  return (
    <div className="content">
      {/* <Header /> */}
      <div className="container">
        <h4>Recover Your Account</h4>

        {messages && <KratosMessages messages={messages} />}
        {form &&
          <KratosForm
            submitLabel="Send recovery link"
            action={form.action}
            fields={form.fields}
            messages={form.messages} />}
      </div>
    </div>
  )
}
