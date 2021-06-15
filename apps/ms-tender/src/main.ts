/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Constants } from '@cudo/ms-core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  // These ports are injected automatically into the container.
  const daprPort = process.env.DAPR_HTTP_PORT;
  // const daprGRPCPort = process.env.DAPR_GRPC_PORT;

  const stateStoreName = `statestore`;
  const stateUrl = `http://192.168.1.38:${daprPort}/v1.0/state/${stateStoreName}`;

  await app.listen(port, () => {
    Logger.log("state url" + stateUrl);
    Logger.log(Constants.LISTENING_AT + "" + port + '/' + globalPrefix);
  });
}

bootstrap();
