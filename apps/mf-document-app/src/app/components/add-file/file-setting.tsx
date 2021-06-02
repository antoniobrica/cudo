import React, { useContext, useRef } from 'react';
import { Button, Checkbox, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';

import img from 'libs/shared-components/src/upload.png';
import img2 from 'libs/shared-components/src/avatar_1.png';
import img3 from 'libs/shared-components/src/avatar_2.png';
import img4 from 'libs/shared-components/src/avatar_3.png';
import img5 from 'libs/shared-components/src/file_1.png';
import img6 from 'libs/shared-components/src/file_2.png';
import ProgressBar from 'libs/shared-components/src/lib/components/progress_bar/progressbar';
import { FollowersIndex, AssigneeIndex, BkpIndex, PhaseIndex, FileTypeIndex, FileStructureIndex, AddFolderIndex } from "@cudo/mf-account-app-lib"
import { UploadsViewStateContext, SharedViewStateContext, DownloadsViewStateContext } from 'apps/mf-document-app/src/azure-storage/contexts/viewStateContext';
import { BlobItem } from '@azure/storage-blob';
import { tap } from 'rxjs/operators';
import { BlobItemUpload, BlobItemDownload } from 'apps/mf-document-app/src/azure-storage/types/azure-storage';

import { LoaderPage } from "@cudo/shared-components"
import { useFileMutation } from '../../services/useRequest';
import { GET_FILES, UPLOAD_FILE } from '../../graphql/graphql';
import { FileMutation, IFiles } from '../../interfaces/document';
import { FetchResult, useMutation } from '@apollo/client';
import { AddNewFolder } from '@cudo/shared-components';
export interface FileProps {
  openSettingF
}
export function FileSetting(props: FileProps) {
  const context = useContext(UploadsViewStateContext);
  const [fileData, setFileData] = React.useState<BlobItem[]>([]);
  const [loader, setLoader] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const [isFolder, setisFolder] = React.useState(false);
  const [folderopen, setFolderOpen] = React.useState(false);
  const [people, setAsignis] = React.useState([]);
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



  // const [addFile] = useFileMutation(UPLOAD_FILE);
  const [addFile, { data }] = useMutation(UPLOAD_FILE,
    {
      refetchQueries: [
        { query: GET_FILES }
      ]
    }
  )

  const [items, setItems] = React.useState<BlobItemUpload[]>([]);
  const [download, setDownload] = React.useState<BlobItemDownload[]>([]);

  const sharedContext = React.useContext(SharedViewStateContext);

  const getContainerItemsEffect = () => {
    setLoader(true);
    const sub = sharedContext.itemsInContainer$
      .pipe(tap(items => {
        setFileData(items)
        setLoader(false);
      }
      ))
      .subscribe();
    return () => sub.unsubscribe();
  };
  React.useEffect(getContainerItemsEffect, []);
  const getUploadsEffect = () => {
    const sub = context.uploadedItems$
      .pipe(tap(items => {
        console.log('getUploadsEffect', items);
        setItems(items);
        const fileArr = [];
        for (let i = 0; i < items.length; i++) {
          fileArr.push({ fileURL: items[i].filename, fileTitle: items[i].filename, fileType: items[i].type, fileVersion: "v1" });
        }
        console.log('fileArr', fileArr);

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
  const [open, setOpen] = React.useState(false)
  const setBKPIDChange = (data) => {
    console.log('bkp=f', data.isFolder);
    setisFolder(data.isFolder)
    if (data.isFolder) {
      setfolderName(data.folderTitle)
      setDirectory(data.folderTitle)
      console.log('folderName', folderName);
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
  const setAsignee = (data) => {
    setAsignis(data)
  }
  const specifyPeople = () => {
    setShowPeople(previousCount => !previousCount)
  }
  React.useEffect(() => {
    if (props.openSettingF) {
      setOpen(props.openSettingF);
    }
  }, [props.openSettingF]);
  const openf = () => {
    setOpen(true)
  }

  const uploadFiles = (files: FileList | null) => {
    console.log('files', files);
    files && context.uploadItems(files);
    // const fileArr = [];
    // for (let i = 0; i < items.length; i++) {
    //   fileArr.push({ fileURL: items[i].filename, fileTitle: items[i].filename, fileType: items[i].type, fileVersion: "v1" });
    // }
    // console.log('fileArr', fileArr);

    // setFileList(fileArr);
  }
  enum fileType {
    IMAGE = "IMAGE",
    PDF = "PDF",
    BIM = "BIM"
  }
  const handleSaveFile = () => {
    setOpen(false);
    files.map((file, i) => {
      console.log('file==', file);
      addFile({
        variables: {
          directory,
          fileURL: file.fileURL,
          fileTitle: file.fileTitle,
          fileType: file.fileType == "image/png" ? fileType.IMAGE : fileType.PDF,
          fileVersion: 1,
          fileTypeName, people, BKPIDTitle,
          phaseName, fileTypeID, phaseID,
          structureTitle, structureID,
          isFolder, isEveryOneAllowed: false,
          BKPID
        },
        update: (
          cache,
          data
        ) => {
          const cacheData = cache.readQuery({ query: GET_FILES }) as IFiles;
          cache.writeQuery({
            query: GET_FILES,
            data: {
              tasks: [...cacheData.uploadedFiles, data?.createFile]
            }
          });
        }
      });
    })


  };

  const folderOpen = () => {
    console.log('folder');
    setFolderOpen(true);
  }
  const cancel = (data) => {
    setFolderOpen(false);
  }
  const folderData = (data) => {
    console.log('folderName=>', data);
    setFolderOpen(false);
  }


  return (
    <div >
      {folderopen ?
        <div>
          <AddFolderIndex open={folderopen} cancel={cancel} folderData={folderData}></AddFolderIndex>
        </div> : null}
      <Modal className="modal_media modal_center modal_media_1"
        onClose={() => setOpen(false)}
        onOpen={openf}
        open={open}
        trigger={<Button size='mini' className="grey-btn">Uploaded File</Button>}
      >
        <Modal.Header><h3>Add File </h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area" style={{ paddingTop: 15 }}>
                        <div className="file-upload-message">
                          <img src={img} className="mr-10 " />
                          <p className="file-upload-default-message">Drag & drop or click here to upload file</p>

                        </div>
                        <Input type="file" className="file-upload-input" multiple={true} onChange={e => uploadFiles(e.target.files)} />
                      </div>

                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <br /><br />
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Upload files</label>


                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              {items &&
                items.map((file, index) => {
                  return (
                    <div key={index}>
                      <Grid columns={12}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>

                              <img src={img6} />

                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                              {/* <label></label> */}
                              <label className="width_area">{file.filename}</label>


                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>

                              <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      {file.progress < 100 ?
                        <ProgressBar progress={file.progress}></ProgressBar> : null}
                    </div>
                  )
                })}
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="content">
                        <div className="description">Generate file number
                  <p className="enable">Enable this option to generate file numbering</p>
                          <Checkbox toggle className="toggle_area" />
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Project</label>
                      <Select placeholder='Select' className="small" options={projectOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <PhaseIndex parentPhaseSelect={onsetPhasesID} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <BkpIndex parentBKPSelect={setBKPIDChange}></BkpIndex>
                    <Form.Field>
                      <a className="anchor-color" onClick={folderOpen}>+ Add New</a>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>File type</label>
                      <Select placeholder='Select' className="small" options={fileTypeOptions} />
                    </Form.Field> */}
                    <FileTypeIndex parentFileTypeSelect={setFileTypeChange} />
                  </Grid.Column>
                  <Grid.Column>
                    <FileStructureIndex parentFileStructureSelect={setFileStructureChange} />
                    {/* <Form.Field>
                      <label>File structure</label>
                      <Select placeholder='Select' className="small" options={fileOptions} />

                    </Form.Field> */}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid  >
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Who can access</label>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2} >
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Everyone in the Project/Work type' className="small" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Specify People only' className="small" onChange={specifyPeople} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {showPeople ?
                <div>
                  <Grid columns={1} >
                    <Grid.Row>
                      <Grid.Column>
                        <AssigneeIndex parentAsigneeSelect={setAsignee} name="Select people" />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Grid columns={5} >
                    <Grid.Row>
                      {people.map((asign, i) => {
                        return (
                          <Grid.Column key={i}>
                            <Form.Field>
                              <div className="below_area">
                                <img src={img3} className="avatar" />
                                <span className="span_name">{asign.userName}</span>
                                <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>
                              </div>
                            </Form.Field>

                          </Grid.Column>
                        )
                      })}

                      {/* <Grid.Column>
                        <Form.Field>

                          <div className="below_area">
                            <img src={img3} className="avatar" />
                            <span className="span_name">Barthelemy Chalvet</span>
                            <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>

                          </div>
                        </Form.Field>

                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>

                          <div className="below_area">
                            <img src={img4} className="avatar" />
                            <span className="span_name">Barthelemy Chalvet</span>
                            <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>

                          </div>
                        </Form.Field>

                      </Grid.Column> */}
                    </Grid.Row>
                  </Grid> </div> :
                null
              }
            </Form>

          </div>


        </Modal.Content>
        <Modal.Actions>

          <Button
            content="Submit"
            onClick={handleSaveFile}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
            X  Cancel
        </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default FileSetting
