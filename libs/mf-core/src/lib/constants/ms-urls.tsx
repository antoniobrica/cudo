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
    url: "http://dev.cudo.ch/api/ms-cost/graphql"
  },
  "ms_meeting": {
    url: "http://cudo-ms-meeting.softobiz.net/graphql"
  },  
  "mf_cost_app": {
    url: "http://192.168.0.31:6004"
  },
  "mf_meeting_app": {
    url: "http://192.168.0.31:6005"
  },
  "mf_project_app": {
    url: "http://dev.cudo.ch/project"
  },
  "mf_task_app": {
    url: "http://dev.cudo.ch/project/task"
  },
  "mf_document_app": {
    url: "http://dev.cudo.ch/project/document"
  },
  "kratos_BASE_URL": {
    url: "http://dev.cudo.ch"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://dev.cudo.ch/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://dev.cudo.ch/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.0.31:4434"
  }

}