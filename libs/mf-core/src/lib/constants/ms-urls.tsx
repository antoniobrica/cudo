interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    url: 'http://192.168.43.44:5001/api/ms-account/graphql'
    // url: 'https://dev.cudo.ch/api/ms-account/graphql'
  },
  "ms_document": {
    // url: 'http://192.168.43.44:5003/api/ms-document/graphql'
    url: "https://dev.cudo.ch/api/ms-document/graphql"
  },
  "ms_project": {
    // url: 'http://192.168.43.44:5005/api/ms-project/graphql'
    url: "https://dev.cudo.ch/api/ms-project/graphql"
  },
  "ms_task": {
    // url: 'http://192.168.43.44:5007/api/ms-task/graphql'
    url: "https://dev.cudo.ch/api/ms-task/graphql"
  },
  "ms_cost": {
    // url: 'http://192.168.43.44:5002/api/ms-cost/graphql'
    url: "https://dev.cudo.ch/api/ms-cost/graphql"
  },
  "ms_meeting": {
    // url: 'http://192.168.43.44:5004/api/ms-meeting/graphql'
    url: "https://dev.cudo.ch/api/ms-meeting/graphql"
  },
  "mf_cost_app": {
    url: "http://192.168.43.44:6004"
  },
  "mf_meeting_app": {
    url: "http://192.168.43.44:6005"
  },
  "mf_project_app": {
    url: "http://192.168.43.44:6006"
  },
  "mf_task_app": {
    url: "http://192.168.43.44:6009"
  },
  "mf_document_app": {
    url: "http://192.168.43.44:6010"
  },
  "kratos_BASE_URL": {
    url: "http://192.168.43.44:4455"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://192.168.43.44:4455/.ory/kratos/public"    
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://192.168.43.44:4455/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.43.44:4434"
  },
  "ASSETS_CDN_URL": {
    url: "https://cudodevcdn.azureedge.net"
  }

}