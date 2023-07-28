import { HttpException } from '@nestjs/common';
import { ProjectErrorData } from './projectCustomErrorMessage';

class ProjectCustomError extends HttpException {
    constructor(errorCode: number) {
        const errorData = ProjectErrorData(errorCode)
        super(errorData.message, errorData.code);
    }
}

export default ProjectCustomError;