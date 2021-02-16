import { ReferenceInput } from "../dto/input/reference.input";
import { ReferenceModel } from "../model/reference";

export interface IReferenceService {
    create(createProjectTaskInput: ReferenceInput): Promise<ReferenceModel>;
}
