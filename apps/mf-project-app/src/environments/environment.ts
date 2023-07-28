// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { MS_SERVICE_URL } from "@cudo/mf-core";

export const environment = {
  production: false,
  EACT_APP_COST_HOST: MS_SERVICE_URL['mf_cost_app'].url,
  REACT_APP_MEETING_HOST: MS_SERVICE_URL['mf_meeting_app'].url,
  API_URL: MS_SERVICE_URL['ms_project'].url,
  REACT_APP_TASK_HOST: MS_SERVICE_URL['mf_task_app'].url,
  REACT_APP_DOCUMENT_HOST: MS_SERVICE_URL['mf_document_app'].url,
};
