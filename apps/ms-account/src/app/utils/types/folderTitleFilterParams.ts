import { Field, InputType } from "@nestjs/graphql";

@InputType()
class FolderTitleFilterParams {
    @Field({description: "Folder title"})
    folderTitle: string
}
export default FolderTitleFilterParams