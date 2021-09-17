import React, { useState, useEffect } from 'react';

import { Form, Grid, Icon } from 'semantic-ui-react';

import { LoaderPage } from "@cudo/shared-components"

import { GET_COMMENTS } from '../../graphql/graphql';
import { useQuery, useMutation } from '@apollo/client';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import moment from 'moment';

export interface CommentListProps {
  uploadedFileID?
}

export function CommentList(props: CommentListProps) {

  // const [comment, setComment] = useState(null)
  
  const { loading: commentListLoading, error: commentListError, data: commentListData } = useQuery(GET_COMMENTS, {
    variables: { uploadedFileID: props?.uploadedFileID },
  });

const onClickEditComment = () =>{
console.log('---edit--')
}

const onClickDeleteComment = () =>{
  
  console.log('---delete--')
}

  console.log('---commentListData--', commentListData)
  return (
    <>
      {commentListData && commentListData?.getComments?.map((comment) => {
        console.log('---comment--', comment)
        const { commentsID, comment: commentMessage, createdBy, createdAt, updatedAt } = comment
        const latestCommentedOn = updatedAt !== null ? updatedAt : createdAt
        const commentedOn = moment(latestCommentedOn).format('DD MMM, YYYY')
        // const formattedMeetingStartTime = moment(meetingStartTime).format('hh:mm A')
        return (

          <div className="comments-section">
            <div className="comment-user-img">
              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
            </div>
            <div className="comment-info">
              {/* <h3>John Smith <span>20 Aug, 2021</span></h3> */}
              <h3>{createdBy}<span>{commentedOn}</span></h3>
              {/* <p>I have a query that exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p> */}
              <p>{commentMessage.length > 129 ? commentMessage.subStr(0, 129) : commentMessage}</p>
            </div>
            <span className="checklist-actions" onClick={() => onClickEditComment()}> <Icon name="pencil" /></span>
        <span className="checklist-actions" onClick={() => onClickDeleteComment()}>< Icon name="trash alternate outline" /> </span>

          </div>

        )
      })
      }
    </>

  )
}

export default CommentList
