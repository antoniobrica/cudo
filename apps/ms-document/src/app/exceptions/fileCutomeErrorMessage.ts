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
            return { message: "Project not found", code: 3007 }

        case FileErrorTypeEnum.COMMENT_NOT_FOUND:
            return { message: "Comment not found", code: 3008 }
        case FileErrorTypeEnum.COMMENT_ID_NOT_PROVIDE:
            return { message: "Comment id not provided", code: 3009 }
        case FileErrorTypeEnum.COMMENT_NOT_ADDED:
            return { message: "Comment not added", code: 3010 }
        case FileErrorTypeEnum.COMMENT_NOT_UPDATED:
            return { message: "Comment not updated", code: 3011 }
        case FileErrorTypeEnum.COMMENT_NOT_DELETED:
            return { message: "Comment not deleted", code: 3012 }

        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}