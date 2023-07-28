interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    // url: 'http://192.168.1.5:5001/graphql'
    url: 'https://dev.cudo.ch/api/ms-account/graphql'
  },
  "ms_document": {
    // url: 'http://192.168.1.5:5003/api/ms-document/graphql'
    url: "https://dev.cudo.ch/api/ms-document/graphql"
  },
  "ms_project": {
    // url: 'http://192.168.1.5:5005/graphql'
    url: "https://dev.cudo.ch/api/ms-project/graphql"
  },
  "ms_task": {
    // url: 'http://192.168.1.5:5007/graphql'
    url: "https://dev.cudo.ch/api/ms-task/graphql"
  },
  "ms_cost": {
    // url: 'http://192.168.1.5:5002/graphql'
    url: "https://dev.cudo.ch/api/ms-cost/graphql"
  },
  "ms_meeting": {
    // url: 'http://192.168.1.5:5004/graphql'
    url: "https://dev.cudo.ch/api/ms-meeting/graphql"
  },
  "mf_cost_app": {
    url: "http://192.168.1.5:6004"
    // url: "http://dev.cudo.ch/api/ms-cost/graphql"
  },
  "mf_meeting_app": {
    url: "http://192.168.1.5:6005"
    // url: "http://cudo-mf_meeting.softobiz.net"
  },
  "mf_project_app": {
    url: "http://192.168.1.5:6006"
    // url: "http://cudo-mf-project.softobiz.net"
  },
  "mf_task_app": {
    url: "http://192.168.1.5:6009"
    // url: "http://cudo-mf-task.softobiz.net"
  },
  "mf_document_app": {
    url: "http://192.168.1.5:6010"
    // url: "http://cudo-mf-document.softobiz.net"
  },
  "kratos_BASE_URL": {
    url: "http://192.168.1.5:4455"
    // url: "http://cudo-ory.symple.co.in"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://192.168.1.5:4455/.ory/kratos/public"
    // url: "http://cudo-ory.symple.co.in/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://192.168.1.5:4455/.ory/kratos/public"
    // url: "http://cudo-ory.symple.co.in/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.1.5:4434"
    // url: "http://192.168.1.5:4434"
  },
  "ASSETS_CDN_URL": {
    url: "https://cudodevcdn.azureedge.net"
  }

}
