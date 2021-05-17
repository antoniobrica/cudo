import { ArgsType, Field } from "@nestjs/graphql";
import loggerMiddleware from "../../../../middlewares/logger.middleware";

@ArgsType()
export class BkpFilterArgs {

    @Field({ description: `BKP ID`, middleware: [loggerMiddleware] })
    bkpID?: string;
}
