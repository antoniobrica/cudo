export interface IComment {
    commentsID: string
    taskID: string
    comment: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
}

export interface IComments {
    getComments: IComment[];
}


export interface ICommentAdd {
    taskID: string
    comment: string   
    createdBy: string
}
export interface ICommentUpdate {
    commentsID: string;
    comment: string   
}
export interface ICommentDelete {
    commentsID?: string;
}


export interface CommentAddMutation {
    addTask: ICommentAdd;
}
export interface CommentUpdateMutation {
    updateTask: ICommentUpdate;
}
export interface CommentDeleteMutation {
    deleteTask: ICommentDelete;
}