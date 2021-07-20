import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateBkpCostBasicInput {

    @Field({ description: `BKP ID` })
    BKPID: string;

    @Field({ description: `BKP Title` })
    BKPTitle: string;

    @Field({ description: `BKP Description` })
    description: string;

    @Field({ description: `BKP quantity` })
    itemQuantity: number;

    @Field({ description: `Each BKP item price` })
    itemPrice: number;

    @Field({ description: `bkpCostID` })
    bkpCostID: string;
}



