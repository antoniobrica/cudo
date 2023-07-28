import { HttpException } from '@nestjs/common';
import { FileErrorData } from './fileCutomeErrorMessage';

class FileCustomError extends HttpException {
    constructor(errorCode: number) {
        const errorData = FileErrorData(errorCode)
        super(errorData.message, errorData.code);
    }
}

export default FileCustomError;