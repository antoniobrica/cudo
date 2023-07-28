import config from '../config/kratos';
import axios from 'axios';

export const initialiseRequest = (
  { type }: { type: 'login' | 'login1' | 'register' | 'settings' | 'verify' | 'recover' | 'browserLogin' | 'error' },
  { filterid }: { filterid: 'flow' | 'error' }
): Promise<any> => {
  const endpoints = {
    login: `${config.kratos.browser}/self-service/login/browser?return_to=${config.baseUrl}/callback`,
    register: `${config.kratos.browser}/self-service/registration/browser?return_to=${config.baseUrl}/callback`,
    settings: `${config.kratos.browser}/self-service/settings/browser`,
    verify: `${config.kratos.public}/self-service/browser/flows/verification/init/email`,
    recover: `${config.kratos.public}/self-service/recovery/browser`,
    browserLogin: `${config.kratos.public}/self-service/login/flows`,
    error: `${config.kratos.public}/self-service/errors`,
    login1: `${config.kratos.public}/self-service/login/browser`,
  };

  return new Promise((resolve, reject) => {
    // const params = new URLSearchParams(window.location.search);
    // const request = params.get("flow") || ""
    // const endpoint = endpoints[type]
    // // Ensure request exists in params.
    // if (!request) return window.location.href = endpoint
    // let authRequest: Promise<any> | undefined
    // if (type === "login") authRequest = kratos.getSelfServiceLoginFlow(request)
    // else if (type === "register") authRequest = kratos.getSelfServiceRegistrationFlow(request)
    // else if (type === "settings") authRequest = kratos.getSelfServiceSettingsFlow(request)
    // else if (type === "verify") authRequest = kratos.getSelfServiceVerificationFlow(request)
    // else if (type === "recover") authRequest = kratos.getSelfServiceRecoveryFlow(request)
    // if (!authRequest) return reject()
    // authRequest.then(({ data, status }) => {
    //   if (status !== 200) return reject(data)
    //   resolve(data)
    // }).catch(error => {
    //   return window.location.href = endpoint
    // })
  });
};
