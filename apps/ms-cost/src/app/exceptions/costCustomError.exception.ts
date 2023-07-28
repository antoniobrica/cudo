import { HttpException } from '@nestjs/common';
import { CostErrorData } from './costCusromErrorMessage';

class CostCustomError extends HttpException {
    constructor(errorCode: number) {
        const errorData = CostErrorData(errorCode)
        super(errorData.message, errorData.code);
    }
}

export default CostCustomError;