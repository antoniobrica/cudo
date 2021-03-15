import React from "react"
import { Link } from "react-router-dom"
import { isAuthenticated, logout } from "../services/auth"
import config from "../config/kratos"

export const Header = () => (
  <div className="header">
    <Link to="/">Home</Link>
    <div className="icon-actions">
      {isAuthenticated() &&
        <React.Fragment>
          <div className="settings">
            <Link to={config.routes.settings.path}>Setting</Link>
          </div>
          <div className="logout">
            <button onClick={logout} className="a">Logout</button>
          </div>
        </React.Fragment>}
    </div>
  </div>
)
