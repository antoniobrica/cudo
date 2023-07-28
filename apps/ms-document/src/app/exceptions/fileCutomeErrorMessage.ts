import { FileErrorTypeEnum } from "../enum/file-error-type.enum"

interface IFileErrorCode {
    message: string;
    code: number
}

export const FileErrorData = (errorCode: number): IFileErrorCode => {
    switch (errorCode) {
        case FileErrorTypeEnum.FILE_ALREADY_EXIST:
            return { message: "File already exists", code: 3001 }

        case FileErrorTypeEnum.FILE_NOT_FOUND:
            return { message: "File not found", code: 3002 }

        case FileErrorTypeEnum.PARENT_FILE_NOT_FOUND:
            return { message: "Parent file not found", code: 3003 }

        case FileErrorTypeEnum.FILE_VERSION_NOT_FOUND:
            return { message: "File version not found", code: 3004 }

        case FileErrorTypeEnum.PINS_NOT_FOUND:
            return { message: "Pins not found", code: 3005 }

        case FileErrorTypeEnum.FILE_NOT_ADDED:
            return { message: "File not added", code: 3006 }

        case FileErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: 3003 }

        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}