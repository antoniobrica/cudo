import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Button, Input, Form, Grid } from 'semantic-ui-react';

import { LoaderPage } from "@cudo/shared-components"

import { GET_COMMENTS, ADD_COMMENT } from '../../graphql/graphql';
import { useQuery, useMutation } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';

export interface CommentAddProps {
  uploadedFileID?
}

export function CommentAdd(props: CommentAddProps) {

  const [commentMessage, setCommentMessage] = useState('')

  const { loading: commentListLoading, error: commentListError, data: commentListData } = useQuery(GET_COMMENTS, {
    variables: { uploadedFileID: props?.uploadedFileID },
  });

  const [addComment, { loading: commentAddLoading, error: commentAddError, data: commentAddData }] = useMutation(ADD_COMMENT)

  // const onCommentTextChange = (e) => {
  //   setCommentMessage(e.target.value)
  // }

  const onCommentDescription = (html) => {
    console.log('--onCommentDescription---e---', html)
    // if(html.length > 10){
    // event.preventDefault()
    setCommentMessage(html)
    // }
  }

  const onClickCommentAdd = () => {
    console.log('---props?.uploadedFileID---', props?.uploadedFileID, '--commentMessage--', commentMessage)
    addComment({
      variables: {
        uploadedFileID: props?.uploadedFileID,
        comment: commentMessage,
        createdBy: "John Smith"
      },

      // update: (cache, createdCommentData) => {

      //   const cacheData = cache.readQuery({
      //     query: GET_COMMENTS,
      //     variables: { uploadedFileID: props?.uploadedFileID },
      //   }) as IComments;

      //   const newCommentList = cacheData?.tasks?.results?.map((task) => {
      //     if (task.taskID === data.taskID) {
      //       const subTaskList = createdCommentData?.data?.updateTask[0]?.subtasks
      //       return { ...task, subtasks: subTaskList }
      //     } else {
      //       return task;
      //     }
      //   });

      //   cache.writeQuery({
      //     query: GET_COMMENTS,
      //     variables: { uploadedFileID: props?.uploadedFileID },
      //     data: {
      //       getComments: newCommentList
      //     },
      //   });
      // },
    })
    setCommentMessage('')
  };

  // const onClickCommentCancel = () => {
  //   setCommentMessage('')
  // }

  return (
    <Form.Field>
      <label>Comments ({commentListData?.getComments?.length})</label>
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
        onChange={(content, delta, source, editor) => onCommentDescription(content)}
        // onKeyDown={onKeyPresDescription}
        id="txtDescription"
      />
      {/* <span className="greenbutton anchor_complete" onClick={() => onClickCommentAdd()}>
        <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
      </span> &nbsp;  <span className="redbutton anchor_complete" onClick={() => onClickCommentCancel()}>
        <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> </span> */}
      <div className="comments-action">
        <Button positive size='small' className="primary full-width" onClick={() => onClickCommentAdd()}>Add Comment</Button>
      </div>
    </Form.Field>

  )
}

export default CommentAdd
