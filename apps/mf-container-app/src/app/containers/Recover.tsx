import React, { useEffect, useState } from "react"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { Header } from "../components/Header"
import { Button, Icon } from "semantic-ui-react"
import { login, ToEmail } from "../services/auth"
import { useTranslation } from "react-i18next"

export const Recover = () => {
  const [requestResponse, setRequestResponse] = useState<any>()
  const {t} = useTranslation()

  useEffect(() => {
    const request = initialiseRequest({ type: "recover" }, { filterid: "flow" }) as Promise<any>
    request
      .then(request => setRequestResponse(request))
      .catch((error) => { console.log(error) })
  }, [setRequestResponse])

  const form = requestResponse?.methods?.link?.config
  const messages = requestResponse?.messages

  return (
    <div>
      {/* <Header /> */}
      <div>
        {messages && <KratosMessages messages={messages} />}
        {form &&
          <KratosForm
            submitLabel={t("login.kratos_form_title")}
            action={form.action}
            fields={form.fields}
            messages={form.messages} />}
      </div>
    </div>
  )
}
