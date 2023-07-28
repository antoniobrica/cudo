import React, { useEffect, useState } from "react"
import { initialiseRequest } from "../services/kratos"
// import { KratosMessages } from "../components/KratosMessages"
// import { KratosForm } from "../components/KratosForm"
import { Header } from "../components/Header"

export const Verify = () => {
  const [requestResponse, setRequestResponse] = useState<any>()

  useEffect(() => {
    const request = initialiseRequest({ type: "verify" }, { filterid: "flow" }) as Promise<any>
    request
      .then(request => setRequestResponse(request))
      .catch((error) => { console.log(error) })
  }, [setRequestResponse])

  const { form, messages } = requestResponse || {}

  return (
    <div className="content">
      <Header />
      <div className="container">
        <h4>Resend verification code</h4>
        {/* {messages && <KratosMessages messages={messages} />}
        {form &&
          <KratosForm
            submitLabel="Resend verification code"
            action={form.action}
            fields={form.fields}
            messages={form.messages} />} */}
      </div>
    </div>
  )
}
