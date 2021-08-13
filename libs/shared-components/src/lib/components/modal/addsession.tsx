import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Grid, Select, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import { MeetingCategoryIndex, SessionInvitationIndex, SessionProtocolIndex, FollowersIndex, AssigneeIndex, AdminsIndex, MembersIndex } from '@cudo/mf-account-app-lib';
import { useTranslation } from 'react-i18next';

export interface SessionProps {
  workTypes?
  createSession?
  openAddSession?
  cancel?
  loading?
  data?
  dataList?
}

interface AddSessionErrors {
  workTypeError?: string,
  titleError?: string,
  categoryError?: string,
  adminsError?: string,
  membersError?: string,
  invitationTemplateError?: string,
  protocolTemplateError?: string,
}

export function ModalAddSession(props: SessionProps) {

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
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

  const [errors, setErrors] = useState<AddSessionErrors>({})
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (props.workTypes) {
      setworkType(props.workTypes.map(({ workTypeName, projectWorkTypeID }) => ({ key: projectWorkTypeID, value: workTypeName, text: workTypeName, id: projectWorkTypeID })));

    }
  }, [props.workTypes]);

  useEffect(() => {
    if (props.openAddSession) {
      setOpen(true);
    }
  }, [props.openAddSession])

  const openSessionAddPopup = () => {
    setOpen(true)
    props.openAddSession(true)
  }

  //on show or hide loader
  const sessionDataListTotal = props?.dataList.paginatedSession.total
  useEffect(() => {
    if (!props.loading && props.data) {
      cancel()
    }
  }, [sessionDataListTotal])

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
    let errorResponse: AddSessionErrors = {}

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
  const createSession = () => {
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

    props.createSession(data);
  }

  const cancel = () => {
    setOpen(false)
    props.cancel()
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
  }

  return (
    <div style={{ marginLeft: 900 }} >
      <Modal
        className= {`modal_media right-side--fixed-modal add-session-modal${loader && " overflow-hidden"}`}
        closeIcon
        onClose={cancel}
        onOpen={openSessionAddPopup}
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
          <h3>{t("project_tab_menu.meeting.add_session")} </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        {t("project_tab_menu.meeting.name")} <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder={t("project_tab_menu.meeting.session_title")}
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
                      <label>{t("project_list.add_new_project.worktype")}<span className="danger">*</span></label>
                      <Select
                        clearable
                        placeholder={t("common.select")}
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
                      <MeetingCategoryIndex parentCatagorySelect={parentCatagorySelect} error={errors?.categoryError && !catagory?.length}></MeetingCategoryIndex>
                      {errors?.categoryError && !catagory?.length ? <span className="error-message">{errors.categoryError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <AdminsIndex admins={[]} parentAdminsSelect={onAdmins} error={errors?.adminsError && !admins?.length} />
                      {errors?.adminsError && !admins?.length ? <span className="error-message">{errors.adminsError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <div className="followers-label-area">
                  <Form.Field>
                    <div className="event top-event follower-listing-labels">
                      {admins?.map((p, id) => {
                        const name = p.userName.split(" ").map((n) => n[0]).join("");
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

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Members<span className="danger">*</span></label>
                      <MembersIndex members={[]} parentMembersSelect={onMembers} error={errors?.membersError && !members.length} />
                      {errors?.membersError && !members.length ? <span className="error-message">{errors.membersError}</span> : null}
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <div className="followers-label-area">
                  <Form.Field>
                    <div className="event top-event follower-listing-labels">
                      {members?.map((p, id) => {
                        const name = p.userName.split(" ").map((n) => n[0]).join("");
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
                      <SessionInvitationIndex parentInvitationSelect={parentInvitationSelect} error={errors?.invitationTemplateError && !invitation?.length} />
                      {errors?.invitationTemplateError && !invitation?.length ? <span className="error-message">{errors.invitationTemplateError}</span> : null}
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <SessionProtocolIndex parentSessionSelect={parentSessionSelect} error={errors?.protocolTemplateError && !protocol?.length} />
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
            content={t("common.submit")}
            onClick={createSession}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t("common.cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalAddSession;
