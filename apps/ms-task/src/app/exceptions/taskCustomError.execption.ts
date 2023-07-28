import { HttpException } from '@nestjs/common';
import { TaskErrorData } from './taskCustomeErrorMessage';

class TaskCustomError extends HttpException {
    constructor(errorCode: number) {
        const errorData = TaskErrorData(errorCode)
        super(errorData.message, errorData.code);
    }
}

export default TaskCustomError;