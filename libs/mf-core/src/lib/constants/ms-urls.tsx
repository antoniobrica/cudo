interface IURL {
  url: string;
}
export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  ms_account: {
    url: 'https://dev.cudo.ch/api/ms-account/graphql',
  },
  ms_document: {
    url: 'https://dev.cudo.ch/api/ms-document/graphql',
  },
  ms_project: {
    url: 'https://dev.cudo.ch/api/ms-project/graphql',
  },
  ms_task: {
    url: 'https://dev.cudo.ch/api/ms-task/graphql',
  },
  ms_cost: {
    url: 'https://dev.cudo.ch/api/ms-cost/graphql',
  },
  ms_meeting: {
    url: 'https://dev.cudo.ch/api/ms-meeting/graphql',
  },
  mf_cost_app: {
    url: 'https://costappdev.cudo.ch',
  },
  mf_meeting_app: {
    url: 'https://meetingappdev.cudo.ch',
  },
  mf_project_app: {
    url: 'https://projectappdev.cudo.ch',
  },
  mf_task_app: {
    url: 'https://taskappdev.cudo.ch',
  },
  mf_document_app: {
    url: 'https://documentappdev.cudo.ch',
  },
  kratos_BASE_URL: {
    url: 'https://development.cudo.ch',
  },
  kratos_KRATOS_BROWSER_URL: {
    url: 'https://development.cudo.ch/.ory/kratos/public',
  },
  kratos_KRATOS_PUBLIC_URL: {
    url: 'https://development.cudo.ch/.ory/kratos/public',
  },
  kratos_KRATOS_ADMIN_URL: {
    url: 'http://192.168.0.31:4434',
  },
  ASSETS_CDN_URL: {
    url: 'https://cudodevcdn.azureedge.net',
  },
};
