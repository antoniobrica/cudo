import React, { useState, useEffect } from 'react';

import { Button, Input, Form, Grid } from 'semantic-ui-react';

import { LoaderPage } from "@cudo/shared-components"

import { GET_COMMENTS, ADD_COMMENT } from '../../graphql/graphql';
import { useQuery, useMutation } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';

export interface CommentAddProps {
  uploadedFileID?
}

export function CommentAdd(props: CommentAddProps) {

  const [comment, setComment] = useState(null)
  
  const { loading:commentListLoading, error:commentListError, data:commentListData  } = useQuery(GET_COMMENTS, {
    variables: { uploadedFileID: props?.uploadedFileID },
  });
  
  const [addComment, { loading:commentAddLoading, error:commentAddError, data:commentAddData }] = useMutation(ADD_COMMENT)

  const onCommentTextChange = (e) => {
    setComment(e.eventArgs.value)
  }

  const onClickCommentAdd = () => {

    addComment({
      variables: {
        uploadedFileID: props?.uploadedFileID,
        comment
      },
    })
  };

  return (
    <Form.Field>
      <label>Comments ({commentListData?.getComments?.length})</label>
      <Input placeholder='click to add comment' size='small' className="full-width" type="text"
        onChange={() => onCommentTextChange}
        onClick={onClickCommentAdd}
      />
    </Form.Field>

  )
}

export default CommentAdd
