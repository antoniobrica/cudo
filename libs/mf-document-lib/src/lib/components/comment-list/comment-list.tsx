import React, { useState, useEffect } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import { LazyLoading, LoaderPage } from "@cudo/shared-components"
import { IComments } from '../../interfaces/comment';
import { GET_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT } from '../../graphql/graphql';
import { useQuery, useMutation } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import moment from 'moment';
import ReactQuill from 'react-quill';

import { toast, ToastContainer } from 'react-toastify';
import { useCommentQuery } from '../../services/useRequest';

import { useTranslation } from 'react-i18next';

export interface CommentListProps {
  uploadedFileID?
}

interface EditCommentError {
  commentError?: string
}

export function CommentList(props: CommentListProps) {

  const { t } = useTranslation();

  const [commentMessage, setCommentMessage] = useState('')
  const [openEditComment, setOpenEditComment] = useState(false)
  const [selectedCommentID, setSelectedCommentID] = useState(null)

  // const [commentEditLoadingState, setCommentEditLoadingState] = useState(false)
  // const [commentDeleteLoadingState, setCommentDeleteLoadingState] = useState(false)

  const [commentErrors, setCommentErrors] = useState("")
  const [activeErrorClass, setActiveErrorClass] = useState(false)

  const [errors, setErrors] = React.useState<EditCommentError>({})

  // get logged user info
  const loggedUserDetailRetrieve = localStorage.getItem('loggedUserDetail');
  const loggedUserDetail = JSON.parse(loggedUserDetailRetrieve);

  const { loading: commentListLoading, error: commentListError, data: commentListData } = useCommentQuery(GET_COMMENTS, {
    variables: { uploadedFileID: props?.uploadedFileID },
  });

  const [updateComment, { loading: commentUpdateLoading, error: commentUpdateError, data: commentUpdateData }] = useMutation(UPDATE_COMMENT)
  const [deleteComment, { loading: commentDeleteLoading, error: commentDeleteError, data: commentDeleteData }] = useMutation(DELETE_COMMENT)

  // useEffect(() => {
  //   if (commentUpdateData && !commentUpdateLoading) {
  //     setCommentEditLoadingState(false)
  //   }
  // }, [commentUpdateData])

  // useEffect(() => {
  //   if (commentDeleteLoading && !commentDeleteData) {
  //     setCommentDeleteLoadingState(false)
  //   }
  // }, [commentDeleteLoading])

  const onChangeComment = (html, editor) => {
    const textLength = editor.getLength()
    if (textLength > 1) {
      setCommentMessage(html)
    } else {
      setCommentMessage('')
    }
  }

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
      case 3009:
        errorExeptionMessage = t("toaster.error.comment.comment_id_not_provided")
        break
      case 3010:
        errorExeptionMessage = t("toaster.error.comment.comment_not_added")
        break
      case 3011:
        errorExeptionMessage = t("toaster.error.comment.comment_not_updated")
        break
      case 3012:
        errorExeptionMessage = t("toaster.error.comment.comment_not_deleted")
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

  // set toaster for edit comment
  useEffect(() => {
    if (!commentUpdateLoading && commentUpdateData) {
      // setCommentEditLoadingState(false)
      getCommentToasterMessage(t("toaster.success.comment.comment_updated"))
    }
    if (!commentUpdateLoading && commentUpdateError) {
      // setCommentEditLoadingState(false)
      getCommentErrorMessage(commentUpdateError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [commentUpdateLoading])


  // set toaster for delete comment
  useEffect(() => {
    if (!commentDeleteLoading && commentDeleteData) {
      // setCommentDeleteLoadingState(false)
      getCommentToasterMessage(t("toaster.success.comment.comment_deleted"))
    }
    if (!commentDeleteLoading && commentDeleteError) {
      // setCommentDeleteLoadingState(false)
      getCommentErrorMessage(commentDeleteError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [commentDeleteLoading])

  // #endregion

  const onClickEditComment = (commentsID, commentMessage) => {

    setOpenEditComment(true)
    setSelectedCommentID(commentsID)
    setCommentMessage(commentMessage)
  }

  const onClickCommentUpdate = (e) => {
    e.preventDefault()
    // Validation
    const foundErrors: EditCommentError = {}
    if (!commentMessage) {
      foundErrors.commentError = t("common.errors.comment_error")
      setErrors(foundErrors)
      return false
    }

    // show Loader
    // setCommentEditLoadingState(true)
    updateComment({
      variables: {
        // uploadedFileID: props?.uploadedFileID,
        commentsID: selectedCommentID,
        comment: commentMessage
      },
      update: (cache, updatedCommentData) => {

        const cacheData = cache.readQuery({
          query: GET_COMMENTS,
          variables: { uploadedFileID: props?.uploadedFileID },
        }) as IComments;

        cache.writeQuery({
          query: GET_COMMENTS,
          variables: { uploadedFileID: props?.uploadedFileID },
          data: {
            getComments: [...cacheData?.getComments, updatedCommentData],
          },
        });
      },
    })

    setOpenEditComment(false)
    setSelectedCommentID(null)
    setCommentMessage('')
  }

  const onClickDeleteComment = (commentsID) => {

    setOpenEditComment(!openEditComment)
    // setCommentDeleteLoadingState(true)

    deleteComment({
      variables: {
        commentsID
      },
      update: (cache, data) => {

        const cacheData = cache.readQuery({
          query: GET_COMMENTS,
          variables: { uploadedFileID: props?.uploadedFileID },
        }) as IComments;

        const newCommentList = cacheData?.getComments?.filter((item) => item.commentsID !== commentsID)

        cache.writeQuery({
          query: GET_COMMENTS,
          variables: { uploadedFileID: props?.uploadedFileID },
          data: {
            getComments: newCommentList,
          },
        });
      },
    })
  }

  return (
    <>
      {commentListData && commentListData?.getComments?.filter((item) => item.isDeleted != true)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((comment) => {

          const { commentsID, comment: commentDescription, createdBy, createdAt, updatedAt } = comment
          const latestCommentedOn = updatedAt !== null ? updatedAt : createdAt
          const commentedOn = moment(latestCommentedOn).format('DD MMM, YYYY')

          return (
            <>
              {(commentUpdateLoading || commentDeleteLoading) ? <LazyLoading /> :
                <div id={commentsID} className="comments-section">
                  <div className="comment-user-img">
                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
                  </div>
                  <div className="comment-info">
                    {/* <h3>John Smith <span>20 Aug, 2021</span></h3> */}
                    <h3>{createdBy}
                      <span>
                        {commentedOn}
                        {createdBy === loggedUserDetail.loggedUserName ?
                          <div className="comments-action">
                            <span className="checklist-actions" onClick={() => onClickEditComment(commentsID, commentDescription)}><Icon name="pencil" /></span>
                            <span className="checklist-actions" onClick={() => onClickDeleteComment(commentsID)}><Icon name="trash alternate outline" /> </span>
                          </div>
                          : null}
                      </span>
                    </h3>
                    {/* <p>I have a query that exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p> */}
                    {openEditComment && (commentsID === selectedCommentID) ?
                          <>
                            <ReactQuill
                              value={commentMessage === '' ? commentDescription : commentMessage}
                              // value={commentDescription}
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
                              placeholder="click to edit comment"
                              onChange={(content, delta, source, editor) => onChangeComment(content, editor)}
                              // onChange={(content, delta, source, editor) => setCommentMessage(content)}
                              // onKeyDown={onKeyPresDescription}
                              id="txtDescription"
                            />
                            {errors?.commentError && !commentMessage ? <span className="error-message">{errors.commentError}</span> : null}

                            <div className="save-comment">
                              <i className="ms-Icon ms-Icon--Send" onClick={onClickCommentUpdate}></i>
                              {/* <Button positive size='small' className="primary full-width">Save Comment</Button> */}
                            </div>
                          </>
                      :
                      // <p>{commentDescription.length > 129 ? commentDescription.substr(0, 129) : commentDescription}</p>
                      <p><ReactQuill id="txtDescription" readOnly={true} value={commentDescription} modules={{ toolbar: null }} /></p>
                    }
                  </div>


                </div>
              }
            </>
          )
        })
      }
    </>

  )
}

export default CommentList
