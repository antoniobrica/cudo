interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    // url: "http://cudo-ms-account.softobiz.net/graphql"
    // url: 'http://192.168.3.198:5001/graphql'
    url: 'http://dev.cudo.ch/api/ms-account/graphql'
  },
  "ms_document": {
    // url: "http://cudo-ms-document.softobiz.net/graphql"
    url: "http://dev.cudo.ch/api/ms-document/graphql"
  },
  "ms_project": {
    // url: "http://cudo-ms-project.softobiz.net/graphql"
    // url: 'http://192.168.3.198:5005/graphql'
    url: "http://dev.cudo.ch/api/ms-project/graphql"
  },
  "ms_task": {
    // url: "http://cudo-ms-task.softobiz.net/graphql"
    // url: 'http://192.168.3.198:5006/graphql'
    url: "http://dev.cudo.ch/api/ms-task/graphql"
  },
  "ms_cost": {
    // url: 'http://192.168.3.198:5002/graphql'
    url: "http://dev.cudo.ch/api/ms-cost/graphql"
  },
  "ms_meeting": {
    // url: 'http://192.168.3.198:5004/graphql'
    url: "http://dev.cudo.ch/api/ms-meeting/graphql"
  },
  "mf_cost_app": {
    // url: "http://192.168.3.198:6004"
    url: "http://dev.cudo.ch/api/ms-cost/graphql"
  },
  "mf_meeting_app": {
    url: "http://192.168.3.198:6005"
  },
  "mf_project_app": {
    url: "http://192.168.3.198:6006"
  },
  "mf_task_app": {
    url: "http://192.168.3.198:6009"
  },
  "mf_document_app": {
    url: "http://192.168.3.198:6010"
  },
  "kratos_BASE_URL": {
    url: "http://192.168.3.198:4455"
    // url: "http://cudo-ory.symple.co.in"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://192.168.3.198:4455/.ory/kratos/public"
    // url: "http://cudo-ory.symple.co.in/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://192.168.3.198:4455/.ory/kratos/public"
    // url: "http://cudo-ory.symple.co.in/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.3.198:4434"
  },
  "ASSETS_CDN_URL": {
    url: "https://cudodevcdn.azureedge.net"
  }

}





