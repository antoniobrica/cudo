interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    url: "http://cudo-aa-ms-account-app-dev.cudo-b-dev.svc.cluster.local:8080"
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
    url: "http://cudo-ms-cost.softobiz.net/graphql"
  },
  "mf_cost_app": {
    url: "http://192.168.0.31:6004"
  },
  "mf_meeting_app": {
    url: "http://192.168.0.31:6005"
  },
  "mf_project_app": {
    url: "http://cudo-pa-mf-project-app-dev.cudo-f-dev.svc.cluster.local:8080"
  },
  "mf_task_app": {
    url: "http://cudo-ta-mf-task-app-dev.cudo-f-dev.svc.cluster.local:8080"
  },
  "mf_document_app": {
    url: "http://cudo-da-mf-document-app-dev.cudo-f-dev.svc.cluster.local:8080"
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
