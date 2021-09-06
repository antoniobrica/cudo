import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class InvitationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}



// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { NextFn } from "@nestjs/graphql";

// @Injectable()
// export class InvitationMiddleware implements NestMiddleware{
//    constructor(){}
//    async use(req: Request, res: Response,nest: NextFunction){

//       // get token and decode or any custom auth logic
//       next()
//    }
// }

//=========================================

// import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

// const loggerMiddleware: FieldMiddleware = async (
//     ctx: MiddlewareContext,
//     next: NextFn,
// ) => {
//     const value = await next();

//     return value;
// };
// export default loggerMiddleware;
