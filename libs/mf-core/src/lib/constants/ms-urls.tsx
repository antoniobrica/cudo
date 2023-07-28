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
    url: "http://cudo-ms-task.softobiz.net/graphql"
  },
  "ms_cost": {
    url: 'http://192.168.0.31:5002/graphql'
  },
  "mf_cost_app": {
    url: "http://192.168.0.31:6004"
  },
  "mf_meeting_app": {
    url: "http://192.168.0.31:6005"
  },
  "mf_project_app": {
    url: "http://192.168.0.31:6006"
  },
  "mf_task_app": {
    url: "http://192.168.0.31:6009"
  },
  "mf_document_app": {
    url: "http://192.168.0.31:6010"
  },
  "kratos_BASE_URL": {
    url: "http://192.168.0.31:4455"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://192.168.0.31:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://192.168.0.31:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.0.31:4434"
  }

}
