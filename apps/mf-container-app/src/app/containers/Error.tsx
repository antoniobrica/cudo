import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { initialiseRequest } from "../services/kratos"
import { KratosMessages } from "../components/KratosMessages"
import { KratosForm } from "../components/KratosForm"
import { register } from "../services/auth"
import config from "../config/kratos"

export const Error = () => {
  const [requestResponse, setRequestResponse] = useState<any>()

  useEffect(() => {
    const request = initialiseRequest({ type: "error" }, { filterid: "error" }) as Promise<any>
    request
      .then(request => {
        setRequestResponse(request.data)
        console.log(request.data)
      })
      .catch((error) => { console.log(error) })
  }, [])

  return (
    <div className="auth">
      <div className="container">
        <div>
          {JSON.stringify(requestResponse)}
        </div>
        <hr className="divider" />
        <div className="alternative-actions">
          <p>
            <button onClick={() => register({ setReferer: false })} className="a">
              Register new account
            </button>
          </p>
          <p>
            <Link to={config.routes.recovery.path}>Reset password</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
