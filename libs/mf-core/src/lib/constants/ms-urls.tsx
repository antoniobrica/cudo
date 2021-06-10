interface IURL {
  url: string;
}

export const MS_SERVICE_URL: { [serviceName: string]: IURL } = {
  "ms_account": {
    url: "http://localhost:5001/graphql"
  },
  "ms_document": {
    url: "http://localhost:5003/graphql"
  },
  "ms_project": {
    url: "http://localhost:5005/graphql"
  },
  "ms_task": {
    url: "http://localhost:5007/graphql"
  }
}
