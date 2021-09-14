import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';

import { Button, Checkbox, Header, Radio, Dropdown, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
import ProgressBar from 'libs/shared-components/src/lib/components/progress_bar/progressbar';

import { LoaderPage, SelectDropdown } from "@cudo/shared-components"
import { FetchResult, useMutation } from '@apollo/client';
import { AddNewFolder } from '@cudo/shared-components';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

import { useFileMutation } from '../../services/useRequest';
import { FileMutation, IFiles } from '../../interfaces/document';
import { GET_FILES, UPLOAD_FILE } from '../../graphql/graphql';

import { BkpIndex, PhaseIndex, FileTypeIndex, FileStructureIndex, AddFolderIndex, FollowersIndex } from "@cudo/mf-account-app-lib"
import { UploadsViewStateContext, SharedViewStateContext, DownloadsViewStateContext } from './../../../azure-storage/contexts/viewStateContext';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { tap } from 'rxjs/operators';
// import { BlobItemUpload, BlobItemDownload } from './../../../azure-storage/types/azure-storage';
import { BlobItemUpload, BlobItemDownload } from 'libs/mf-document-lib/src/azure-storage/types/azure-storage';

export interface AddFileSettingUploadProps { }

export function AddFileSettingUpload(props: AddFileSettingUploadProps) {

  const context = useContext(UploadsViewStateContext);
  const sharedContext = React.useContext(SharedViewStateContext);

  const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  const [loader, setLoader] = React.useState(false);

  const [isFolder, setisFolder] = React.useState(false);
  const [folderopen, setFolderOpen] = React.useState(false);
  const [files, setFileList] = React.useState<any>([]);
  const [fileTypeName, setfileTypeName] = React.useState("");
  const [fileTypeID, setfileTypeID] = React.useState("");
  const [structureTitle, setstructureTitle] = React.useState("");
  const [structureID, setstructureID] = React.useState("");
  const [BKPIDTitle, setBKPIDTitle] = React.useState("");
  const [BKPID, setBKPID] = React.useState("");
  const [phaseName, setPhasesName] = React.useState("");
  const [phaseID, setPhasesID] = React.useState("");
  const [folderName, setfolderName] = React.useState("");
  const [directory, setDirectory] = React.useState("");
  const [file, setFile] = React.useState(null)

  const [accessPeople, setAccessPeople] = React.useState(null);
  const [followers, setFollowers] = React.useState<any>([])

  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<BlobItemUpload[]>([]);
  const [items1, setItems1] = React.useState<ContainerItem[]>([]);

  const [download, setDownload] = React.useState<BlobItemDownload[]>([]);

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();

  const { t } = useTranslation()

  // const [addFile] = useFileMutation(UPLOAD_FILE);
  const [addFile, { data }] = useMutation(UPLOAD_FILE,
    {
      refetchQueries: [
        { query: GET_FILES, variables: { projectId } }
      ]
    }
  )


  const getContainerItemsEffect = () => {
    // setLoader(true);
    const sub = sharedContext.itemsInContainer$
      .pipe(tap(items => {
        setFileData(items)
        // setLoader(false);
      }
      ))
      .subscribe();
    return () => sub.unsubscribe();
  };
  React.useEffect(getContainerItemsEffect, []);

  const getContainersEffect = () => {
    // const blobItem = { containerName: "test" } as BlobItemUpload
    // setItems1([blobItem])
    setItems1([{ name: "test" }] as ContainerItem[])
    sharedContext.getContainerItems("test");
    return
  };
  React.useEffect(getContainersEffect, []);

  const getUploadsEffect = () => {
    const sub = context.uploadedItems$
      .pipe(tap(items => {

        setItems(items);
        const fileArr = [];
        for (let i = 0; i < items.length; i++) {
          fileArr.push({ fileURL: items[i].filename, fileTitle: items[i].filename, fileType: items[i].type, fileVersion: "v1" });
        }

        setFileList(fileArr);
      }))
      .subscribe();
    return () => sub.unsubscribe();
  };
  React.useEffect(getUploadsEffect, []);

  const projectOptions = [
    { key: 'ew', value: 'ew', text: 'Electrical Work' },
    { key: 'hv', value: 'hv', text: 'HVAC Work' },
    { key: 'pw', value: 'pw', text: 'Paint Work' },
  ]
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

  const setFileTypeChange = (data) => {
    setfileTypeName(data.fileTypeTitle);
    setfileTypeID(data.fileTypeID)
  }
  const onsetPhasesID = (data) => {

    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const setSpecificPeople = (data) => {
    setFollowers(data)
  }

  const uploadFiles = (files: FileList | null) => {

    files && context.uploadItems(files);

  }
  enum fileType {
    IMAGE = "IMAGE",
    PDF = "PDF",
    BIM = "BIM"
  }
  const handleSaveFile = () => {
    setOpen(false);

    files.map((file, i) => {

      addFile({
        variables: {
          projectId,
          projectTitle: "gamesoft",

          directory,
          fileURL: file.fileURL,
          fileTitle: file.fileTitle,
          fileType: file.fileType === "image/png" ? fileType.IMAGE : fileType.PDF,
          fileVersion: 1,
          fileTypeName,
          people: followers,
          BKPIDTitle,
          phaseName,
          fileTypeID,
          phaseID,
          structureTitle,
          structureID,
          isFolder,
          isEveryOneAllowed: false,
          BKPID
        },
        update: (
          cache,
          data
        ) => {
          const cacheData = cache.readQuery({ query: GET_FILES }) as IFiles;
          cache.writeQuery({
            query: GET_FILES,
            variables: { projectId },
            data: {
              tasks: [...cacheData.uploadedFiles, data['createFile']]
            }
          });
        }
      });
    })


  };

  const folderOpen = () => {

    setFolderOpen(true);
  }
  const cancel = (data) => {
    setFolderOpen(false);
  }
  const folderData = (data) => {

    setFolderOpen(false);
  }

  // const onFileChange = event => {
  //   const fl = event.target.files;
  //   setFile(fl);
  //   props.fileData(fl);

  // };
  // const upload = () => {
  //   setOpen(false);
  //   props.onFileSubmit(file);
  // }

  return (
    <div id=" " className="add-files-modal" >
      {folderopen ?
        <div>
          <AddFolderIndex open={folderopen} cancel={cancel} folderData={folderData}></AddFolderIndex>
        </div> : null}
      <Modal className="modal_media modal_center add-file-setting-popup"
        closeIcon
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='small' className="primary"><i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("project_tab_menu.add_file")}</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>{t("project_tab_menu.add_file")}</h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area">
                        <div className="file-upload-message">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
                          <p className="file-upload-default-message">{t("common.drag_and_drop")}</p>
                        </div>
                        {/* <Input type="file" className="file-upload-input" multiple={true} onChange={onFileChange} /> */}
                        <Input type="file" className="file-upload-input" multiple={true} onChange={e => uploadFiles(e.target.files)} />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/* <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="content" onClick={openSetting}>
                        <div className="description">{t("project_tab_menu.files.file_settings")}
                          <span className="float_right"><i className="ms-Icon ms-Icon--ChevronRightMed" aria-hidden="true"></i> </span>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid> */}

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <div className="uploaded-files">
                      <h3>{t("project_tab_menu.files.upload_files")}</h3>
                      <ul>
                        {items && items.length > 0 && items.map((file, index) => {

                          return (
                            <>
                              <li key={index}>
                                <p>
                                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/powerpoint.png`} alt="" />
                                  {file.filename}
                                </p>
                                <i className="ms-Icon ms-Icon--CalculatorMultiply" aria-hidden="true"></i>
                              </li>

                              {file.progress < 100 ?
                                <ProgressBar progress={file.progress}></ProgressBar> : null}
                            </>)
                        })
                        }
                      </ul>

                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <div className="file-setting-option">
                      <h3>{t("project_tab_menu.files.file_settings")}</h3>
                      <div className="generate-file-number">
                        {/* <p>Generate file number <span>Enable this option to generate file numbering</span></p> */}
                        <p>{t("project_tab_menu.files.generate_file_number")} <span>{t("project_tab_menu.files.generate_file_number_check")}</span></p>
                        <Checkbox toggle className="toggle_area" />
                      </div>
                    </div>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            <label>{t("menu.project")}</label>
                            <Select placeholder='Select' className="small" options={projectOptions} clearable />
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                            <label>{t("common.phase")}</label>
                            <PhaseIndex parentPhaseSelect={onsetPhasesID} />
                          </Form.Field>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Grid columns={3}>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            {/* <label>BKP/Folder</label> */}
                            {/* <Select placeholder='Select' className="small" options={countryOptions} clearable /> */}
                            <BkpIndex bkp={BKPID}
                              parentBKPSelect={setBKPIDChange}
                              // folderOpen={folderOpen}
                            ></BkpIndex>
                            {/* <Form.Field>
                              <a className="anchor-color" onClick={folderOpen}>+ {t("common.add_new_button")}</a>
                            </Form.Field> */}
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                            {/* <label>File type</label>
                            <Select placeholder='Select' className="small" options={countryOptions} clearable /> */}
                            <FileTypeIndex parentFileTypeSelect={setFileTypeChange} />
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                            {/* <label>File Structure</label>
                            <Select placeholder='Select' className="small" options={countryOptions} clearable /> */}
                            <FileStructureIndex structureTitle={structureTitle} parentFileStructureSelect={setFileStructureChange} />
                          </Form.Field>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Grid columns={1} className="select-access">
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            <label>{t("common.who_can_access")}</label>
                          </Form.Field>
                          <div className="access-radio">
                            <div className="radio">
                              <label>
                                <input type="radio" name="accessRadioButtonGroup" value="everyOneInProject" onChange={() => setAccessPeople(false)} checked={accessPeople ? false : true} />
                                {/* Everyone in the Project/Subproject */}
                                {t("common.everyone_in_worktype")}
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="accessRadioButtonGroup" value="specificPeopleOnly" onChange={() => setAccessPeople(true)} checked={accessPeople ? true : false} />
                                {/* Specific People only */}
                                {t("common.specific_access")}
                              </label>
                            </div>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    {accessPeople ?
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
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("common.submit")}
            // onClick={upload}
            onClick={handleSaveFile}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i>  {t("common.cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default AddFileSettingUpload
