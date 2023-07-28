import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class InvitationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('----Invitation Middleware----')
    // console.log('Request...',req.ip);
    // console.log('Request...', req.path);
    // console.log('Request...', req.headers);
    next();
  }
}



// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { NextFn } from "@nestjs/graphql";

// @Injectable()
// export class InvitationMiddleware implements NestMiddleware{
//    constructor(){}
//    async use(req: Request, res: Response,nest: NextFunction){
//        console.log('--InvitationMiddleware--req---', req)
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
//     console.log(value);
//     return value;
// };
// export default loggerMiddleware;
