// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { MS_SERVICE_URL } from "@cudo/mf-core";

export const environment = {
  production: false,
  MS_TASK_API_URL: MS_SERVICE_URL['ms_task'].url
};
