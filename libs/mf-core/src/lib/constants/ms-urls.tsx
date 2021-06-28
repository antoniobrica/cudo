interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    url: "http://cudo-ms-account.softobiz.net/graphql"
  },
  "ms_document": {
    url: "http://cudo-ms-document.softobiz.net/graphql"
  },
  "ms_project": {
    url: "http://cudo-ms-project.softobiz.net/graphql"
  },
  "ms_task": {
    url: "http://192.168.29.131:5007/graphql"
  },
  "ms_cost": {
    url: "http://cudo-ms-cost.softobiz.net/graphql"
  },
  "mf_cost_app": {
    url: "http://192.168.29.131:6004"
  },
  "mf_meeting_app": {
    url: "http://192.168.29.131:6005"
  },
  "mf_project_app": {
    url: "http://192.168.29.131:6006"
  },
  "mf_task_app": {
    url: "http://192.168.29.131:6009"
  },
  "mf_document_app": {
    url: "http://192.168.29.131:6010"
  },
  "kratos_BASE_URL": {
    url: "http://192.168.29.131:4455"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://192.168.29.131:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://192.168.29.131:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.29.131:4434"
  }

}
