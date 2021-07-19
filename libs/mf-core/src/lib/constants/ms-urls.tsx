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
    url: "http://dev.cudo.ch/api/ms-meeting/graphql"
  },
  "mf_cost_app": {
    url: "http://cudo-mf_cost.softobiz.net"
  },
  "mf_meeting_app": {
    url: "http://cudo-mf_meeting.softobiz.net"
  },
  "mf_project_app": {
    url: "http://cudo-mf-project.softobiz.net"
  },
  "mf_task_app": {
    url: "http://cudo-mf-task.softobiz.net"
  },
  "mf_document_app": {
    url: "http://cudo-mf-document.softobiz.net"
  },
  "kratos_BASE_URL": {
    url: "http://cudoapp.softobiz.net"
  },
  "kratos_KRATOS_BROWSER_URL": {
    url: "http://cudoapp.softobiz.net/.ory/kratos/public"
  },
  "kratos_KRATOS_PUBLIC_URL": {
    url: "http://cudoapp.softobiz.net/.ory/kratos/public"
  },
  "kratos_KRATOS_ADMIN_URL": {
    url: "http://192.168.0.31:4434"
  },
  "ASSETS_CDN_URL": {
    url: "https://cudodevcdn.azureedge.net"
  }
}