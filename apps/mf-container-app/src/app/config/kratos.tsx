import { MS_SERVICE_URL } from "@cudo/mf-core"

export const BASE_URL = MS_SERVICE_URL["kratos_BASE_URL"].url
export const KRATOS_BROWSER_URL = MS_SERVICE_URL["kratos_KRATOS_BROWSER_URL"].url
export const KRATOS_PUBLIC_URL = MS_SERVICE_URL["kratos_KRATOS_PUBLIC_URL"].url
export const KRATOS_ADMIN_URL = MS_SERVICE_URL["kratos_KRATOS_ADMIN_URL"].url

export default {
  kratos: {
    browser: KRATOS_BROWSER_URL,
    admin: KRATOS_ADMIN_URL,
    public: KRATOS_PUBLIC_URL,
  },
  baseUrl: BASE_URL,
  projectName: "SecureApp",
  routes: {
    settings: {
      path: "/settings"
    },
    recovery: {
      path: "/recovery"
    },
    verification: {
      path: "/verify"
    },
    login: {
      path: "/auth/login"
    },
    registration: {
      path: "/auth/registration"
    },
    testmodal: {
      path: "/modal"
    },
    error: {
      path: "/error"
    },
    loginEmail: {
      path: "/login-email"
    },
    loginPasswoord: {
      path: "/login-passwoord"
    },
    loginSelect: {
      path: "/login-select"
    }
  }
}
