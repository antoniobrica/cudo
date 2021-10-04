import React, { useEffect, useState, useContext } from 'react';
import { Button, Checkbox, Modal, Input, Form, Grid, Select, Icon, Dimmer, Loader } from 'semantic-ui-react';

import { BkpIndex, PhaseIndex, FileTypeIndex, FileStructureIndex, FollowersIndex } from "@cudo/mf-account-app-lib";
import { ProjectWorkTypeIndex } from "@cudo/mf-project-lib";

import { useMutation } from '@apollo/client';
import { IFiles } from '../../interfaces/document';
import { GET_FILES, UPDATE_UPLOADED_FILE } from '../../graphql/graphql';

import { UploadsViewStateContext, SharedViewStateContext } from 'libs/mf-document-lib/src/azure-storage/contexts/viewStateContext';
import { BlobItemUpload } from 'libs/mf-document-lib/src/azure-storage/types/azure-storage';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { tap } from 'rxjs/operators';

import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
import { LoaderPage } from "@cudo/shared-components"
import { useHistory } from 'react-router-dom';

interface EditFileSettingUploadProps {
  open?,
  filesData?,
  cancel?
}
export function EditFileSettingUpload(props: EditFileSettingUploadProps) {

  const context = useContext(UploadsViewStateContext);
  const sharedContext = useContext(SharedViewStateContext);

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false)

  const [fileData, setFileData] = useState<BlobItem[]>([]);
  const [items, setItems] = useState<BlobItemUpload[]>([]);
  const [items1, setItems1] = useState<ContainerItem[]>([]);

  const [isFolder, setisFolder] = useState(false);
  const [folderName, setfolderName] = useState("");

  const [uploadedFileID, setUploadedFileID] = useState('');

  const [workTypeId, setWorkTypeId] = useState("");
  const [workTypeName, setWorkTypeName] = useState("");

  const [phaseID, setPhasesID] = useState("");
  const [phaseName, setPhasesName] = useState("");

  const [BKPID, setBKPID] = useState("");
  const [BKPIDTitle, setBKPIDTitle] = useState("");

  const [directory, setDirectory] = useState("");

  const [fileTypeID, setfileTypeID] = useState("");
  const [fileTypeName, setfileTypeName] = useState("");

  const [structureID, setstructureID] = useState("");
  const [structureTitle, setstructureTitle] = useState("");

  const [accessPeople, setAccessPeople] = useState(false);
  const [followers, setFollowers] = useState<any>([])

  const [files, setFileList] = useState<any>([]);

  const { t } = useTranslation()

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  // const projectOptions = [
  //   { key: 'ew', value: 'ew', text: 'Electrical Work' },
  //   { key: 'hv', value: 'hv', text: 'HVAC Work' },
  //   { key: 'pw', value: 'pw', text: 'Paint Work' },
  // ]

  const [updateFile, { loading: updateFileLoading, error: updateFileError, data: updateFileData }] = useMutation(UPDATE_UPLOADED_FILE,
    {
      refetchQueries: [
        { query: GET_FILES, variables: { projectId } }
      ]
    }
  )

  useEffect(() => {
    if (props?.filesData) {
     
      const fileArr = [{ fileURL: props?.filesData?.fileTitle, fileTitle: props?.filesData?.fileTitle, fileType: props?.filesData?.fileType }]
      setFileList(fileArr)

      setWorkTypeId(props?.filesData?.workTypeID)
      setWorkTypeName(props?.filesData?.workTypeTitle)

      setPhasesID((props?.filesData?.phaseID).toString());
      setPhasesName(props?.filesData?.phaseName);

      setBKPID(props?.filesData?.BKPID)
      setBKPIDTitle(props?.filesData?.BKPIDTitle)

      setDirectory(props?.filesData?.directory)
      setfolderName(props?.filesData?.folderTitle)

      setfileTypeName(props?.filesData?.fileTypeName);
      setfileTypeID(props?.filesData?.fileTypeID)

      setstructureID(props?.filesData?.structureID)
      setstructureTitle(props?.filesData?.structureTitle)

      if (props?.filesData?.people?.length > 0) {
        setAccessPeople(true)
        setFollowers(props?.filesData?.people)
      }

      setUploadedFileID(props?.filesData?.uploadedFileID)
      setIsLoading(false);
    }
  }, [props?.filesData]);

  useEffect(() => {
    if (!updateFileLoading && updateFileData) {
      setOpen(false)
      props.cancel()
    }
  }, [updateFileLoading, updateFileData])

  // #region File Upload section
  enum fileType {
    IMAGE = "IMAGE",
    PDF = "PDF",
    BIM = "BIM"
  }

  const getContainerItemsEffect = () => {
    const sub = sharedContext.itemsInContainer$
      .pipe(tap(items => {
        setFileData(items)
      }
      ))
      .subscribe();
    return () => sub.unsubscribe();
  };
  useEffect(getContainerItemsEffect, []);

  const getContainersEffect = () => {
    setItems1([{ name: "test" }] as ContainerItem[])
    sharedContext.getContainerItems("test");
    return
  };
  useEffect(getContainersEffect, []);

  const getUploadsEffect = () => {
    const sub = context.uploadedItems$
      .pipe(tap(items => {

        setItems(items);
        let fileArr = [];
        for (let i = 0; i < items.length; i++) {
          // fileArr.push({ fileURL: items[i].filename, fileTitle: items[i].filename, fileType: items[i].type });
          fileArr = [{ fileURL: items[i].filename, fileTitle: items[i].filename, fileType: items[i].type }];
        }
        console.log('--getUploadsEffect--fileArr---', fileArr)
        setFileList(fileArr);
      }))
      .subscribe();
    return () => sub.unsubscribe();
  };
  useEffect(getUploadsEffect, []);

  const uploadFiles = (files: FileList | null) => {
    files && context.uploadItems(files);
  }

  // #endregion

  const cancel = () => {
    setOpen(false)
    props.cancel()
  }

  // #region On Change items
  const onChangeWorkType = (data) => {
    setWorkTypeId(data.workID);
    setWorkTypeName(data.workTypeName)
  }
  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const setFileTypeChange = (data) => {
    setfileTypeName(data.fileTypeTitle);
    setfileTypeID(data.fileTypeID)
  }
  const setBKPIDChange = (data) => {

    setisFolder(data.isFolder)
    if (data.isFolder) {
      setfolderName(data.folderTitle)
      setDirectory(data.folderTitle)
    }
    else {
      setBKPIDTitle(data.BKPIDTitle)
      setDirectory(data.BKPIDTitle)

      setBKPID(data.BKPID)
    }
  }
  const setFileStructureChange = (data) => {
    // setfileStructureID()
    setstructureID(data.structureID)
    setstructureTitle(data.structureTitle)
  }
  const onClickRemoveSelectedFile = () => {
    setFileList([]);
  }
  const setSpecificPeople = (data) => {
    setFollowers(data)
  }
  // #endregion

  const submit = () => {

    // get logged user info
    const loggedUserDetailRetrieve = localStorage.getItem('loggedUserDetail');
    const loggedUserDetail = JSON.parse(loggedUserDetailRetrieve);

    const data = {
      // projectId,
      // projectTitle: "Test Project Create",

      workTypeId,
      workTypeName,

      phaseID,
      phaseName,

      BKPID,
      BKPIDTitle,
      directory,

      fileTypeID,
      fileTypeName,

      structureID,
      structureTitle,

      // isFolder,
      fileType: files[0].fileType === "application/pdf" ? fileType.PDF : fileType.IMAGE,
      fileTitle: files[0].fileTitle,
      fileURL: files[0].fileURL,
      fileVersion: props?.filesData?.fileVersion,

      people: followers,
      isEveryOneAllowed: followers?.length > 0 ? false : true,

      // parentUploadedFileID,
      uploadedFileID,
      isDeleted: false,
      updatedBy: loggedUserDetail.loggedUserName
    }

    updateFile({
      variables: data,
      update: (
        cache,
        updatedFileData
      ) => {
        const cacheData = cache.readQuery({ query: GET_FILES, variables: { projectId } }) as IFiles;
        cache.writeQuery({
          query: GET_FILES,
          variables: { projectId },
          data: {
            uploadedFiles: [...cacheData.uploadedFiles, updatedFileData?.data?.updateUploadedFile]
          }
        });
      }
    });

  }

  return (
    <div>
      <Modal
        // className="modal_media modal_center modal_media_1"
        className={updateFileLoading ? "modal_media modal_center modal_media_1 overflow-hidden" : "modal_media modal_center modal_media_1"}
        onClose={cancel}
        onOpen={() => setOpen(true)}
        open={props?.open}
        // trigger={<Button size='mini' className="grey-btn"> {t("project_tab_menu.files.edit_file_details")}</Button>}
        closeOnDimmerClick={false}
      >

        {isLoading || updateFileLoading ?
          <Dimmer active inverted Center inline>
            <Loader size='big'>Loading</Loader>
          </Dimmer>
          : null}

        <Modal.Header><h3>{t("project_tab_menu.files.edit_file_details")} </h3></Modal.Header>

        <Modal.Content body>
          <div>
            {isLoading && <div><LoaderPage /> </div>}

            <Form>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("project_tab_menu.files.file_to_replace")}:</label>
                      {files?.length > 0 ?
                        <>
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default.png`} className="mr-10 " />
                          {/* {props?.filesData?.fileTitle} &nbsp; */}
                          {files[0]?.fileTitle} &nbsp;
                          <span className="checklist-actions" onClick={onClickRemoveSelectedFile}>
                            <Icon name="trash alternate outline" />
                          </span>
                        </>
                        : null}
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>


              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area">
                        <div className="file-upload-message">
                          <p className="file-upload-default-message">
                            <i className="ms-Icon ms-Icon--Upload" aria-hidden="true"></i>  {t("project_tab_menu.files.click_to_upload")}</p>

                        </div>
                        <Input type="file" className="file-upload-input"
                          multiple={false} onChange={e => uploadFiles(e.target.files)}
                        />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("project_tab_menu.files.file_settings")}</label>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="content">
                        <div className="description">{t("project_tab_menu.files.generate_file_number")}
                          <p className="enable">{t("project_tab_menu.files.generate_file_number_check")}</p>
                          <Checkbox toggle className="toggle_area" />
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    {/*<Form.Field>
                      <label>{t("menu.project")}</label> 
                      <Select clearable placeholder={t("common.select")} className="small" options={projectOptions} /> 
                    </Form.Field> */}
                    {/* <CompanyWorkTypeIndex label={t("menu.project")} workTypeID={workTypeId} parentWorkTypeSelect={onChangeWorType} /> */}
                    <ProjectWorkTypeIndex label={t("menu.project")} workTypeID={workTypeId} parentWorkTypeSelect={onChangeWorkType} />
                  </Grid.Column>
                  {/* <Grid.Column>
                    <Form.Field>
                      <label>{t("project_list.add_new_project.worktype")}</label>
                      <Select clearable placeholder={t("common.select")} className="small" options={projectOptions} />

                    </Form.Field>
                  </Grid.Column> */}
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.phase")} </label>
                      <PhaseIndex phaseName={phaseName} parentPhaseSelect={onsetPhasesID} />
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    {/* <Form.Field>
                      <label>BKP/Folder</label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <BkpIndex bkp={BKPID} parentBKPSelect={setBKPIDChange} />
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>

                  <Grid.Column>
                    {/* <Form.Field>
                      <label>File type</label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <FileTypeIndex fileTypeName={fileTypeName} parentFileTypeSelect={setFileTypeChange} />

                  </Grid.Column>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>File structure</label>
                      <Select clearable placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <FileStructureIndex structureTitle={structureTitle} parentFileStructureSelect={setFileStructureChange} />

                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid  >
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t("common.who_can_access")}</label>

                    </Form.Field>

                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={2} >
                <Grid.Row>

                  <Grid.Column>
                    <Form.Field>
                      {/* <Checkbox label={t("common.everyone_in_subproject")} className="small" /> */}
                      <label>
                        <input type="radio" name="accessRadioButtonGroup" value="everyOneInProject" onChange={() => setAccessPeople(false)} checked={accessPeople===true ? false : true} />
                        {t("common.everyone_in_worktype")}
                      </label>
                    </Form.Field>

                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      {/* <Checkbox label={t("common.specific_access")} className="small" /> */}
                      <label>
                        <input type="radio" name="accessRadioButtonGroup" value="specificPeopleOnly" onChange={() => setAccessPeople(true)} checked={accessPeople===true ? true : false} />
                        {t("common.specific_access")}
                      </label>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              {accessPeople===true ?
                <div>
                  <Grid columns={1} >
                    <Grid.Row>
                      <Grid.Column>
                        <FollowersIndex followers={[]} parentFollowersSelect={setSpecificPeople} label="Select people" />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={5} >
                    <Grid.Row>
                      {followers.map((item, i) => {
                        return (
                          <Grid.Column key={i}>
                            <Form.Field>
                              <div className="below_area">
                                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_2.png`} className="avatar" />
                                <span className="span_name">{item.userName}</span>
                                <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>
                              </div>
                            </Form.Field>
                          </Grid.Column>
                        )
                      })}
                    </Grid.Row>
                  </Grid> </div>
                : null}

            </Form>

          </div>


        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("common.submit")}
            onClick={submit}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={cancel}>
            X  {t("common.cancel")}
          </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default EditFileSettingUpload

