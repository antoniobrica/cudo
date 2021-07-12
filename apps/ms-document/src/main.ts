/**               
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { SecretService } from '@cudo/ms-core';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/ms-document';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await setEnv();
  const secretService = new SecretService();
  if (!process.env.AZURE_BLOB_CON_STRING) {
    const { value } = await secretService.getSecretValue("cusdo-secret");
    process.env.AZURE_BLOB_CON_STRING = value;
    value.split(';').map(item => {
      if (item.includes('DefaultEndpointsProtocol='))
        process.env.DEFAULT_END_POINTS_PROTOCOL = item.substring(item.indexOf('=') + 1, item.length);
      if (item.includes('AccountName='))
        process.env.ACCOUNT_NAME = item.substring(item.indexOf('=') + 1, item.length);
      if (item.includes('AccountKey='))
        process.env.ACCOUNT_KEY = item.substring(item.indexOf('=') + 1, item.length);
      if (item.includes('EndpointSuffix='))
        process.env.END_POINT_SUFFIX = item.substring(item.indexOf('=') + 1, item.length);
    });

  }
  await app.listen(port, () => {
    Logger.log('Listening at http://192.168.0.31:' + port + '/' + globalPrefix);
  });
}
async function setEnv() {
  process.env.AZURE_TENANT_ID = environment.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID = environment.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET = environment.AZURE_CLIENT_SECRET,
    process.env.VAULT_NAME = environment.VAULT_NAME

}
bootstrap();
