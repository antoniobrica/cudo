import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Grid, Select, Dimmer, Loader } from 'semantic-ui-react';
import { MeetingCategoryIndex, SessionInvitationIndex, SessionProtocolIndex, FollowersIndex, AssigneeIndex, AdminsIndex, MembersIndex } from '@cudo/mf-account-app-lib';
import { useTranslation } from 'react-i18next';

export interface EditSessionProps {
  workTypes?
  sessionDetail?
  openEditSession?
  cancel?
  editSession?
  loading?
  data?
  dataList?
}

interface EditSessionErrors {
  workTypeError?: string,
  titleError?: string,
  categoryError?: string,
  adminsError?: string,
  membersError?: string,
  invitationTemplateError?: string,
  protocolTemplateError?: string,
}

export function ModalEditSession(props: EditSessionProps) {

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null)
  const [sessionTitle, setSessionTitle] = useState("");
  const [workType, setworkType] = useState(null)
  const [workTypeD, setworkTypeD] = useState(null)
  const [workTypeData, setworkTypeData] = useState('')
  const [worktypeID, setworktypeID] = useState("")
  const [worktypeName, setworktypeName] = useState("")
  const [catagory, setCatagory] = useState(null);
  const [protocol, setProtocol] = useState(null);
  const [invitation, setInvitation] = useState(null);
  const [admins, setAdmins] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);

  const [errors, setErrors] = useState<EditSessionErrors>({})
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (props.workTypes) {
      setworkType(props.workTypes.map(({ workTypeName, projectWorkTypeID }) => (
        { key: projectWorkTypeID, value: workTypeName, text: workTypeName, id: projectWorkTypeID }
      )));
    }
  }, [props.workTypes]);

  useEffect(() => {
    if (props.openEditSession) {
      setOpen(true);
    }
  }, [props.openEditSession])

  //on show or hide loader
  useEffect(() => {
    if (!props.loading && props.data) {
      cancel()
    }
  }, [props.dataList])

  useEffect(() => {
    if (props?.sessionDetail?.SessionByID) {
      setDetail(props?.sessionDetail?.SessionByID)
    }
  }, [props?.sessionDetail?.SessionByID])

  useEffect(() => {
    if (detail) {
      setSessionTitle(detail?.sessionTitle)

      if (workType) {
        const workTypeItem = { worktypeID: '', worktypeName: '' };
        for (let i = 0; i < workType?.length; i++) {
          if (workType[i]?.key === detail?.worktypeID) {
            workTypeItem.worktypeID = workType[i].key;
            workTypeItem.worktypeName = workType[i].value;
            setworktypeName(workTypeItem.worktypeName);
            setworktypeID(workTypeItem.worktypeID);
            setworkTypeD(workTypeItem)
          }
        }

        setworkTypeData(workTypeItem.worktypeName)
      }

      if (detail?.admins) {
        const editAdminsData = detail?.admins?.map((item) => {
          return { userID: item.adminID, userName: item.adminName }
        })
        setAdmins(editAdminsData)
      }

      if (detail?.members) {
        const editMemberData = detail?.members?.map((item) => {
          return { userID: item.memberID, userName: item.memberName }
        })
        setMembers(editMemberData)
      }

    }
  }, [detail, workType])

  const openSessionEditPopup = () => {
    setOpen(true)
    props.openEditSession(true)
  }

  const onSessionTitleChange = (e) => {
    setSessionTitle(e.target.value)
    setErrors({ ...errors, titleError: "" })
  }
  const onMworkType = (event, data) => {
    const workT = {
      worktypeID: '',
      worktypeName: ''
    };
    if (data.value) {
      for (let i = 0; i < props?.workTypes?.length; i++) {
        if (props.workTypes[i]?.workTypeName === data.value) {
          workT.worktypeID = props.workTypes[i].projectWorkTypeID;
          workT.worktypeName = data.value;
          setworktypeName(workT.worktypeName);
          setworktypeID(workT.worktypeID);
          setworkTypeD(workT)
          setworkTypeData(data.value)
        }
      }
    } else {
      setworktypeName("")
      setworktypeID("")
      setworkTypeD(null)
      setworkTypeData("")
    }

    setErrors({ ...errors, workTypeError: "" })
  }
  const parentCatagorySelect = (data) => {
    if (data.meetingCatagoryID) {
      setCatagory(data)
      setErrors({ ...errors, categoryError: "" })
    } else {
      setCatagory(null)
    }
  }
  const parentSessionSelect = (data) => {
    if (data.protocolTemplateID) {
      setProtocol(data)
      setErrors({ ...errors, protocolTemplateError: "" })
    } else {
      setProtocol(null)
    }
  }
  const parentInvitationSelect = (data) => {
    if (data.invitationTemplateID) {
      setInvitation(data)
      setErrors({ ...errors, invitationTemplateError: "" })
    } else {
      setInvitation(null)
    }

  }
  const onAdmins = (data) => {
    setAdmins(data);
    setErrors({ ...errors, adminsError: "" })
  }
  const onMembers = (data) => {
    setMembers(data)
    setErrors({ ...errors, membersError: "" })
  }
  const validation = () => {
    let errorResponse: EditSessionErrors = {}

    if (!workTypeD) {
      errorResponse.workTypeError = t('common.errors.worktype_error')
    }
    if (!sessionTitle) {
      errorResponse.titleError = t('project_tab_menu.meeting.errors.title_error')
    }
    if (!catagory) {
      errorResponse.categoryError = t('project_tab_menu.meeting.errors.category_error')
    }
    if (!admins.length) {
      errorResponse.adminsError = t('project_tab_menu.meeting.errors.admins_error')
    }
    if (!members.length) {
      errorResponse.membersError = t('project_tab_menu.meeting.errors.members_error')
    }
    if (!invitation) {
      errorResponse.invitationTemplateError = t('project_tab_menu.meeting.errors.invitation_template_error')
    }
    if (!protocol) {
      errorResponse.protocolTemplateError = t('project_tab_menu.meeting.errors.protocol_template_error')
    }

    return errorResponse
  }
  const editSession = () => {
    const validationResult = validation()
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult)
      return false
    }
    setLoader(true)

    const adminList = admins?.map((item, index) => {
      return { adminID: item.userID, adminName: item.userName, image: "" }
    })

    const memberList = members?.map((item, index) => {
      return { memberID: item.userID, memberName: item.userName, image: "" }
    })

    const data = {
      sessionID: detail?.sessionID,
      sessionTitle: sessionTitle,
      meetingCategoryID: catagory.meetingCatagoryID,
      meetingCategoryTitle: catagory.meetingCatagoryTitle,
      protocolID: protocol.protocolTemplateID,
      protocolTitle: protocol.protocolTemplateTitle,
      invitationID: invitation.invitationTemplateID,
      invitationTitle: invitation.invitationTemplateTitle,
      worktypeID: workTypeD.worktypeID,
      worktypeTitle: workTypeD.worktypeName,
      admins: adminList,
      members: memberList
    }

    props.editSession(data);

    // setOpen(false);
    // resetAddData();
    // props.cancel(true)
  }

  const cancel = () => {
    setOpen(false)
    props.cancel(true)
    resetAddData()
    setLoader(false)
  }

  const resetAddData = () => {
    setSessionTitle("")
    setworkTypeD(null)
    setCatagory(null)
    setInvitation(null)
    setProtocol(null)
    setAdmins([])
    setMembers([])
    setErrors({})
    setworktypeName("")
    setworktypeID("")
    setworkTypeData("")
    setDetail(null)
  }

  return (
    <div style={{ marginLeft: 900 }} >
      <Modal
        className={`modal_media right-side--fixed-modal add-session-modal${loader && " overflow-hidden"}`}
        closeIcon
        onClose={() => setOpen(false)}
        // onOpen={() => setOpen(true)}
        // onClose={cancel}
        onOpen={openSessionEditPopup}
        open={open}
        // trigger={
        //   <Button size="small" className="primary">
        //     + Add New Session{' '}
        //   </Button>
        // }
        closeOnDimmerClick={false}
      >
         {
          loader && (
            <Dimmer active inverted Center inline>
              <Loader size='big'>Loading</Loader>
            </Dimmer>
          )
        }
        <Modal.Header>
          <h3>Edit sessions </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Name <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Session Title"
                        size="small"
                        className="full-width"
                        type="text"
                        value={sessionTitle}
                        onChange={onSessionTitleChange}
                        error={errors.titleError && !sessionTitle}
                      />
                      {errors?.titleError && !sessionTitle ? <span className="error-message">{errors.titleError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Work Type<span className="danger">*</span></label>
                      <Select
                        clearable
                        placeholder="Select"
                        className="small"
                        value={workTypeData}
                        options={workType}
                        onChange={onMworkType}
                        error={errors?.workTypeError && !workTypeData?.length}
                      />
                      {errors?.workTypeError && !workTypeData?.length ? <span className="error-message">{errors.workTypeError}</span> : null}
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <MeetingCategoryIndex parentCatagorySelect={parentCatagorySelect} editCategoryIdSelect={detail?.meetingCategoryID} error={errors?.categoryError && !catagory?.length}></MeetingCategoryIndex>
                      {errors?.categoryError && !catagory?.length ? <span className="error-message">{errors.categoryError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <AdminsIndex admins={admins} parentAdminsSelect={onAdmins} error={errors?.adminsError && !admins?.length} />
                      {errors?.adminsError && !admins?.length ? <span className="error-message">{errors.adminsError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <div className="followers-label-area">
                  <Form.Field>
                    <div className="event top-event follower-listing-labels">
                      {admins?.map((p, id) => {
                        const adminName = p?.userName?.split(" ").map((n) => n[0]).join("");
                        return (
                          <div className="label-light-purple-circle label-spacer" key={id}>
                            <span className="white-text">{adminName}</span>
                          </div>
                        )
                      })
                      }
                    </div>
                  </Form.Field>
                </div>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Members<span className="danger">*</span></label>
                      <MembersIndex members={members} parentMembersSelect={onMembers} error={errors?.membersError && !members?.length} />
                      {errors?.membersError && !members?.length ? <span className="error-message">{errors.membersError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <div className="followers-label-area">
                  <Form.Field>
                    <div className="event top-event follower-listing-labels">
                      {members?.map((p, id) => {
                        const name = p?.userName?.split(" ").map((n) => n[0]).join("");
                        return (
                          <div className="label-light-purple-circle label-spacer" key={id}>
                            <span className="white-text">{name}</span>
                          </div>
                        )
                      })
                      }
                    </div>
                  </Form.Field>
                </div>
              </Grid>


              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <SessionInvitationIndex parentInvitationSelect={parentInvitationSelect} editInvitationTemplateIdSelect={detail?.invitationID}
                        error={errors?.invitationTemplateError && !invitation?.length} />
                      {errors?.invitationTemplateError && !invitation?.length ? <span className="error-message">{errors.invitationTemplateError}</span> : null}
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <SessionProtocolIndex parentSessionSelect={parentSessionSelect} editProtocolTemplateIdSelect={detail?.protocolID}
                        error={errors?.protocolTemplateError && !protocol?.length} />
                      {errors?.protocolTemplateError && !protocol?.length ? <span className="error-message">{errors.protocolTemplateError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={editSession}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            // onClick={() => setOpen(false)}
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalEditSession;
