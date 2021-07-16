interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    url: "http://dev.cudo.ch/api/ms-account/graphql"
  },

  "ms_document": {
    url: "http://dev.cudo.ch/api/ms-document/graphql"
  },
  "ms_project": {
    url: "http://dev.cudo.ch/api/ms-project/graphql"
  },
  "ms_task": {
    url: "http://dev.cudo.ch/api/ms-task/graphql"
  },
  "ms_cost": {
    url: "http://192.168.1.5:5002/graphql"
  },
  "ms_meeting": {
    url: "http://dev.cudo.ch/api/ms-meeting/graphql"
  },
  "mf_cost_app": {
    url: "http://192.168.1.5:6004"
  },
  "mf_meeting_app": {
    url: "http://192.168.1.5:6005"
  },
  "mf_project_app": {
    url: "http://192.168.1.5:6006"
  },
  "mf_task_app": {
    url: "http://192.168.1.5:6009"
  },
  "mf_document_app": {
    url: "http://192.168.1.5:6010"
  },
  "kratos_BASE_URL": {
    url: "http://192.168.1.5:4455"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://192.168.1.5:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://192.168.1.5:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.1.5:4434"
  }

}