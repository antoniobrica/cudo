import { ProjectErrorTypeEnum } from "../enums/project-error-type.enum"

interface IProjectErrorCode {
    message: string;
    code: number;
}

export const ProjectErrorData = (errorCode: number): IProjectErrorCode => {
    switch (errorCode) {
        case ProjectErrorTypeEnum.RECORD_ALREADY_EXIST:
            return { message: "Record already exists", code: 5001 }

        case ProjectErrorTypeEnum.PROJECT_NOT_EXIST:
            return { message: "Project not exist", code: 5002 }

        case ProjectErrorTypeEnum.RECORD_NOT_ADDED:
            return { message: "Record not_added", code: 5003 }

        case ProjectErrorTypeEnum.NO_PROJECT_NAME:
            return { message: "Can't pass empty Project Name", code: 5004 }

        case ProjectErrorTypeEnum.NO_PROJECT_NUMBER:
            return { message: "Can't pass empty Project Number", code: 5005 }

        case ProjectErrorTypeEnum.NO_CLIENT:
            return { message: "Can't pass empty Client", code: 5006 }
        
        case ProjectErrorTypeEnum.NO_BUILDING:
            return { message: "Can't pass empty Building Type", code: 5007 }

        case ProjectErrorTypeEnum.PROJECT_NOT_FOUND:
            return { message: "Project not found", code: 5008 }

        case ProjectErrorTypeEnum.NO_REFERANCE_TYPE:
            return { message: "Reference type does not exists", code: 5009 }

        case ProjectErrorTypeEnum.COMPANY_NOT_FOUND:
            return { message: "Company not found", code: 5010 }
        
        case ProjectErrorTypeEnum.BUILDING_NOT_FOUND:
        return { message: "Building not found", code: 5011 }


        default:
            return { message: "An internal server error occurred", code: 500 }
    }
}