import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import React from 'react'
import {
    Button,
    Checkbox,
    Modal,
    Input,
    Form,
    Grid,
    Dropdown,
    TextArea,
} from 'semantic-ui-react';
export interface EditProtocolProps {
    openProtcolEdit?
    cancel
    protocolData?
    editProtocol?
    loading?,
    error?,
    data?
}
export function ModalEditProtocol(props: EditProtocolProps) {
    const [open, setOpen] = React.useState(false);
    const [protocolTitle, setProtocolTitle] = React.useState("");
    const [protocolDate, setProtocolDate] = React.useState("");
    const [protocolStartTime, setProtocolStartTime] = React.useState("");
    const [protocolEndTime, setProtocolEndTime] = React.useState("");
    const [protocolDescription, setProtocolDescription] = React.useState("");
    const { t } = useTranslation()


    React.useEffect(() => {
        if (props.openProtcolEdit) {
            setOpen(props.openProtcolEdit)
        }
    }, [props.openProtcolEdit])

    //on show or hide loader
   React.useEffect(() => {
    if (!props.loading && props.data) {
    //   props.getInvitationToasterMessage(t("toaster.success.meeting.meeting_edit"))
      closeProtocolEdit()
    }
    if (!props.loading && props.error) {
    //   props.getInvitationErrorMessage(props.error?.graphQLErrors[0]?.extensions?.exception?.status)
      closeProtocolEdit()
    }
  }, [props.loading])

    function formatDate(date) {
        const d = new Date(date),
            year = d.getFullYear();
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const formatTime = (date) => {
        const d = new Date(date)
        let hour = '' + (d.getHours()),
            minute = '' + d.getMinutes();

        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;

        return [hour, minute].join(':');
    }

    React.useEffect(() => {

        if (props.protocolData.protocolDate) {
            const d = props.protocolData.protocolDate
            setProtocolDate(formatDate(d))
        }
        if (props.protocolData.protocolStartTime) {
            setProtocolStartTime(formatTime(props.protocolData.protocolStartTime))
        }

        if (props.protocolData.protocolStartTime) {
            setProtocolEndTime(formatTime(props.protocolData.protocolEndTime))
        }

        setProtocolTitle(props?.protocolData?.protocolTitle)
        setProtocolDescription(props?.protocolData?.protocolDescription)

    }, [props.protocolData])

    const closeProtocolEdit = () => {
        setOpen(false)
        props.cancel()
    }

    const onProtocolTitleChange = (e) => {
        setProtocolTitle(e.target.value)
        // setErrors({ ...errors, titleError: "" })
    }

    const onDescription = (e) => {
        // if(html.length > 10){
        // event.preventDefault()
        setProtocolDescription(e.target.value)
        // }
    }

    const onClickStartTime = (e) => {
        setProtocolStartTime(e.target.value)
        if (protocolEndTime) {
            checkTimeValidation(e.target.value, protocolEndTime)
        }
    }

    const onClickEndTime = (e) => {
        setProtocolEndTime(e.target.value)
        if (protocolStartTime) {
            checkTimeValidation(protocolStartTime, e.target.value)
        }
    }

    const getDateTime = (selectedDate, selectedTime) => {

        const momentObj = moment(selectedDate + selectedTime, 'YYYY-MM-DDLT');

        const finalDateTime = momentObj.format('YYYY-MM-DD HH:mm:ss');
        return new Date(finalDateTime)
    }

    const checkTimeValidation = (startTime, endTime) => {
        // if (!protocolDate) {
        //   setErrors({ ...errors, dateError: t('invitation_add.error_date') })
        //   return false
        // } else {
        //   setErrors({ ...errors, dateError: "" })

        const startProtocolDateTime = getDateTime(protocolDate, startTime)
        const endProtocolDateTime = getDateTime(protocolDate, endTime)

        if (startProtocolDateTime > endProtocolDateTime) {
            //     setErrors({ ...errors, startEndTimeError: t('invitation_add.error_start_end_time') })
            //     return false
            //   } else {
            //     setErrors({ ...errors, startEndTimeError: "" })
        }
    }

    const updateProtocol = () => {
        const startProtocolDateTime = getDateTime(protocolDate, protocolStartTime)
        const endProtocolDateTime = getDateTime(protocolDate, protocolEndTime)

        if (startProtocolDateTime > endProtocolDateTime) {
            //     setErrors({ ...errors, startEndTimeError: t('invitation_add.error_start_end_time') })
            //     return false
            // } else {
            //     setErrors({ ...errors, startEndTimeError: null })
        }

        const protocolDurationSeconds = (endProtocolDateTime.getTime() - startProtocolDateTime.getTime()) / 1000
        const protocolDurationMinutes = `${protocolDurationSeconds / 60} min`

        const protocolUpdateData = {
            sessionId: props?.protocolData?.sessionId,
            protocolId: props?.protocolData.protocolId,
            protocolTitle: protocolTitle,
            protocolDate: protocolDate,
            protocolStartTime: startProtocolDateTime,
            protocolEndTime: endProtocolDateTime,
            protocolDescription: protocolDescription,
            protocolFiles: [],
            protocolDuration: protocolDurationMinutes,
            status: "SCHEDULED",
        }

        props.editProtocol(protocolUpdateData)
    }

    return (
        <div id="navbar">
            <Modal
                className="modal_media right-side--fixed-modal add-new-invitation-modal"
                onClose={closeProtocolEdit}
                onOpen={() => setOpen(true)}
                open={open}
                closeIcon
                // trigger={
                //   <Button size="mini" className="grey-btn">
                //     + Add Protocol
                //   </Button>
                // }
                closeOnDimmerClick={false}
            >
                <Modal.Header>
                    <h3>{t("project_tab_menu.meeting.edit_protocol")} </h3>
                </Modal.Header>
                <Modal.Content body>
                    <div>
                        <Form>
                            <Grid columns={1}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>
                                                {t("common.title")} <span className="danger">*</span>
                                            </label>
                                            <Input
                                                placeholder="Team onboarding"
                                                size="small"
                                                className="full-width"
                                                type="text"
                                                value={protocolTitle}
                                                onChange={onProtocolTitleChange}
                                            // error={errors.titleError && !protocolTitle}
                                            />
                                            {/* {errors?.titleError && !protocolTitle ? <span className="error-message">{errors.titleError}</span> : null} */}
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>{t("common.date")} <span className="danger">*</span></label>
                                            <Input
                                                placeholder="Default"
                                                size="small"
                                                className="full-width"
                                                type="date"
                                                value={protocolDate}
                                                onChange={e => setProtocolDate(e.target.value)}
                                            // error={errors.dateError && !protocolDate}
                                            />
                                            {/* {errors?.dateError && !protocolDate ? <span className="error-message">{errors.dateError}</span> : null} */}
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>{t("common.start_time")} <span className="danger">*</span></label>
                                            <Input
                                                placeholder="Default"
                                                size="small"
                                                className="full-width"
                                                type="time"
                                                value={protocolStartTime}
                                                onChange={onClickStartTime}
                                            // error={errors.startTimeError && !protocolStartTime}
                                            />
                                            {/* {errors?.startTimeError && !protocolStartTime ? <span className="error-message">{errors.startTimeError}</span> : null} */}
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>{t("common.end_time")} <span className="danger">*</span></label>
                                            <Input
                                                placeholder="Default"
                                                size="small"
                                                className="full-width"
                                                type="time"
                                                value={protocolEndTime}
                                                onChange={onClickEndTime}
                                            // error={errors.endTimeError && !protocolEndTime}
                                            />
                                            {/* {errors?.endTimeError && !protocolEndTime ? <span className="error-message">{errors.endTimeError}</span> : null}
                                            {errors?.startEndTimeError ? <span className="error-message">{errors.startEndTimeError}</span> : null} */}
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid columns={1}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>{t("common.desc")}</label>
                                            <TextArea placeholder={t("common.tell_us_more")}
                                                value={protocolDescription}
                                                onChange={onDescription}
                                            />                      {/* <ReactQuill
                        value={protocolDescription}
                        
                        modules={{
                          toolbar: false
                          // {
                          //   container: [
                          //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          //     ['bold', 'italic', 'underline'],
                          //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          //     [{ 'align': [] }],
                          //     ['link', 'image'],
                          //     ['clean'],
                          //     [{ 'color': [] }]
                          //   ]
                          // }
                        }}
                        placeholder={t("common.tell_us_more")}
                        onChange={(content, delta, source, editor) => onDescription(content)}
                        // onKeyDown={onKeyPresDescription}
                        id="txtDescription"
                      /> */}
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Grid columns={1}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>{t("common.add_files")}</label>
                                            <div className="dashed_area md_upload">
                                                <div className="file-upload-message">
                                                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
                                                    <p className="file-upload-default-message">
                                                        {t("common.drag_and_drop")}
                                                    </p>
                                                </div>
                                                {/* <Input type="file" className="file-upload-input" /> */}
                                            </div>
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content={t("project_tab_menu.meeting.save_and_cont")}
                        // onClick={createProtocol}
                        positive
                        onClick={updateProtocol}
                        size="small"
                        className="primary"
                    />
                    <Button
                        size="small"
                        className="icon-border"
                        onClick={closeProtocolEdit}
                    >
                        <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t("common.cancel")}
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>

    )
}

export default ModalEditProtocol

