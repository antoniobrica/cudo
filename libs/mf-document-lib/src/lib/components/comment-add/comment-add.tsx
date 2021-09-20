import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
// import { documentAction } from '../../redux/actions'

import ReactQuill, { Quill } from 'react-quill';
import { Button, Input, Form, Grid } from 'semantic-ui-react';

import { LazyLoading, LoaderPage } from "@cudo/shared-components"

import { GET_COMMENTS, ADD_COMMENT } from '../../graphql/graphql';
import { useQuery, useMutation } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { IComments } from '../../interfaces/comment';

import { toast, ToastContainer } from 'react-toastify';

import { useTranslation } from 'react-i18next';

export interface CommentAddProps {
  uploadedFileID?,
  companyId?,
  loggedUserEmail?,
  loggedUserID?,
  loggedUserName?,
  loggedUserProfileURL?
}

interface AddCommentError {
  commentError?: string
}

export function CommentAdd(props: CommentAddProps) {

  const { t } = useTranslation();

  const [commentMessage, setCommentMessage] = useState('')
  const [commentAddLoadingState, setCommentAddLoadingState] = useState(false)

  const [commentErrors, setCommentErrors] = useState("")
  const [activeErrorClass, setActiveErrorClass] = useState(false)

  const [errors, setErrors] = React.useState<AddCommentError>({})

  const { loading: commentListLoading, error: commentListError, data: commentListData } = useQuery(GET_COMMENTS, {
    variables: { uploadedFileID: props?.uploadedFileID },
  });

  const [addComment, { loading: commentAddLoading, error: commentAddError, data: commentAddData }] = useMutation(ADD_COMMENT)

  useEffect(() => {
    if (commentAddData && !commentAddLoading) {
      setCommentAddLoadingState(false)
    }
  }, [commentAddData])

  // #region Toast Success and Error Messages

  // set error message to toaster
  useEffect(() => {
    if (commentErrors) {
      toast(commentErrors)
    }
  }, [commentErrors])

  // set error value to comment error for toaster function
  const getCommentErrorMessage = (data) => {
    setActiveErrorClass(true)

    let errorExeptionMessage: string;
    switch (data) {
      case 3008:
        errorExeptionMessage = t("toaster.error.comment.comment_not_found")
        break
      case 3010:
        errorExeptionMessage = t("toaster.error.comment.comment_not_added")
        break
      default:
        errorExeptionMessage = ""
    }
    setCommentErrors(errorExeptionMessage)
  }

  // set sucess value to toaster function
  const getCommentToasterMessage = (data) => {
    setActiveErrorClass(false)
    toast(data)
  }

  // set toaster for Add comment success
  useEffect(() => {
    if (!commentAddLoading && commentAddData) {
      setCommentAddLoadingState(false)
      getCommentToasterMessage(t("toaster.success.comment.comment_added"))
    }
    if (!commentAddLoading && commentAddError) {
      setCommentAddLoadingState(false)
      getCommentErrorMessage(commentAddError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [commentAddLoading])
  // #endregion


  const onChangeComment = (html,editor) => {
    const textLength = editor.getLength()
    if(textLength>1){
      setCommentMessage(html)
    }else{
      setCommentMessage('')
    }
  }
console.log('---userDetail-in comment add-', props?.companyId, props?.loggedUserEmail, props?.loggedUserID, props?.loggedUserName)
  const onClickCommentAdd = (e) => {
    e.preventDefault()

    // Validation
    const foundErrors: AddCommentError = {}
    if (!commentMessage) {
      foundErrors.commentError = t("common.errors.comment_error")
      setErrors(foundErrors)
      return false
    }

    // show Loader
    setCommentAddLoadingState(true)

    
    // add comment Graphql
    addComment({
      variables: {
        uploadedFileID: props?.uploadedFileID,
        comment: commentMessage,
        createdBy: "John Smith"
      },
      update: (cache, createdCommentData) => {

        const cacheData = cache.readQuery({
          query: GET_COMMENTS,
          variables: { uploadedFileID: props?.uploadedFileID },
        }) as IComments;

        cache.writeQuery({
          query: GET_COMMENTS,
          variables: { uploadedFileID: props?.uploadedFileID },
          data: {
            getComments: [...cacheData?.getComments, createdCommentData]
          },
        });

      }
    })
    setCommentMessage('')
    setErrors({})
    console.log('---end-comment-add--')
  };

  return (
    <Form.Field>
      <label>Comments ({commentListData?.getComments?.filter((item) => item.isDeleted != true).length})</label>
      {commentAddLoadingState ? <LazyLoading /> :
        <>
          {/* <Input placeholder='click to add comment' size='small' className="full-width" type="text" /> */}
          <ReactQuill
            value={commentMessage}
            // modules={{
            //   toolbar: {
            //     container: [
            //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            //       ['bold', 'italic', 'underline'],
            //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            //       [{ 'align': [] }],
            //       ['link', 'image'],
            //       ['clean'],
            //       [{ 'color': [] }]
            //     ]
            //   }
            // }}
            placeholder="click to add comment"
            onChange={(content, delta, source, editor) => onChangeComment(content,editor)}
            // onKeyDown={onKeyPresDescription}
            id="txtDescription"
          // errors={errors?.commentError && !commentMessage}
          />
          {errors?.commentError && !commentMessage ? <span className="error-message">{errors.commentError}</span> : null}

          <div className="comments-action">
            <i className="ms-Icon ms-Icon--Send" onClick={onClickCommentAdd}></i>
            {/* <Button positive size='small' className="primary full-width" onClick={onClickCommentAdd}>Add Comment</Button> */}
          </div>
        </>
      }
    </Form.Field>

  )
}

// export default CommentAdd

const mapStateToProps = state => ({
  companyId: state.app.selectedCompany.selectedCompanyId,
  loggedUserEmail: state.app.loggedUserDetail.loggedUserEmail,
  loggedUserID: state.app.loggedUserDetail.loggedUserID,
  loggedUserName: state.app.loggedUserDetail.loggedUserName,
  loggedUserProfileURL: state.app.loggedUserDetail.loggedUserProfileURL
})

export default connect(mapStateToProps)(CommentAdd)