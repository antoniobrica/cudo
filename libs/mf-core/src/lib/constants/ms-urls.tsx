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
  }
}