import React, { useContext, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import { documentAction } from '../../redux/actions'

import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import './file-listing.module.scss';
import { FileListingStructure, LazyLoading } from '@cudo/shared-components';
import { DeletesViewStateContext, DownloadsViewStateContext, SharedViewStateContext, UploadsViewStateContext } from './../../../azure-storage/contexts/viewStateContext';
import { BlobItemDownload, BlobItemUpload } from './../../../azure-storage/types/azure-storage';
import { tap } from 'rxjs/operators';
import { BlobItem, ContainerItem } from '@azure/storage-blob';
import { LoaderPage, UploadNewVersion } from "@cudo/shared-components"
import { useFileQuery, useFileVersionQuery } from '../../services/useRequest';
import { GET_FILES, UPLOAD_FILE_VERSION, GET_FILE_VERSIONS, DELETE_FILE } from '../../graphql/graphql';
import ItemsDownloaded from './../../../azure-storage/components/ItemsDownloaded';
// import { useMutation } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { IFiles } from '../../interfaces/document';

import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import DeleteFileConfirm from '../delete-file/delete-file';
import { toast, ToastContainer } from 'react-toastify';

/* eslint-disable-next-line */
export interface FileListingProps { companyId, loggedUserEmail }

export function FileListing(props: FileListingProps) {

  const { t } = useTranslation();

  const context = useContext(UploadsViewStateContext);
  // const [items, setItems] = useState<BlobItemUpload[]>([]);
  const [loader, setLoader] = useState(true);
  const [openNew, setOpenNew] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileVersion, setFileVersion] = useState(null);


  const [selectedFileId, setSelectedFileId] = useState(null)
  const [selectedFileVersions, setSelectedFileVersions] = useState(null)

  const [openDeleteFile, setOpenDeleteFile] = useState(false)

  const history = useHistory();
  const pathNames = history.location.pathname.split("/");
  const projectId = pathNames[3].toString();
  // const projectId = "13"

  const dispatch = useDispatch()

  dispatch({ type: documentAction.SELECT_PROJECT_ID, payload: projectId })


  const sharedContext = useContext(SharedViewStateContext);
  const downloadsContext = useContext(DownloadsViewStateContext);
  // const viewContext = useContext(DownloadsViewStateContext);
  const deletesContext = useContext(DeletesViewStateContext);
  const [fileData, setFileData] = useState<BlobItem[]>([]);
  const { loading, error, data } = useFileQuery(GET_FILES, {
    variables: { projectId },
  });
  const [items, setItems] = useState<ContainerItem[]>([]);
  const [itemsd, setItemsd] = useState<BlobItemDownload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openPinFile, setOpenPinFile] = useState(false)
  const [imgUrl, setimgUrl] = useState('');
  const [filesData, setFilesData] = useState([]);

  const [loadingOnDeleteFile, setLoadingOnDeleteFile] = useState(false)

  const [fileErrors, setFileErrors] = useState("")
  const [activeErrorClass, setActiveErrorClass] = useState(false)

  const [addFile, { data: newVersionData }] = useMutation(UPLOAD_FILE_VERSION,
    {
      refetchQueries: [
        {
          query: GET_FILES,
          variables: { projectId },
        }
      ]
    }
  )

  const { loading: fileVersionLoading, error: fileVersionError, data: fileVersionData } = useFileVersionQuery(GET_FILE_VERSIONS, {
    variables: { projectId, fileId: selectedFileId },
  });

  const [deleteFileAPI, { loading: fileDeleteLoading, error: fileDeleteError, data: fileDeleteData }] = useMutation(DELETE_FILE);


  const getDownloadedItems = () => {
    setIsLoading(true)
    const sub = downloadsContext.downloadedItems$
      .pipe(tap(items => {
        setItemsd(items)
        for (let i = 0; i < items.length; i++) {
          if (items[i].url != '') {
            setIsLoading(false)
          }
        }
      }

      ))
      .subscribe();
    setIsLoading(false)

    return () => sub.unsubscribe();
  };
  useEffect(getDownloadedItems, []);

  const getViewItems = () => {
    const sub = downloadsContext.viewItems$
      .pipe(tap(items => {
        setItemsd(items)
      }
      ))
      .subscribe();
    return () => sub.unsubscribe();
  };
  useEffect(getViewItems, []);

  const getContainersEffect = () => {
    setItems([{ name: "test" }] as ContainerItem[])
    sharedContext.getContainerItems("test");
    return
  };
  useEffect(getContainersEffect, []);

  useEffect(() => {
    if (fileVersionData) {
      setSelectedFileVersions(fileVersionData)
    }
  }, [fileVersionData]);

  // set sucess value to toaster function
  const getFileToasterMessage = (data) => {
    setActiveErrorClass(false)
    toast(data)
  }

  // set error value to task error for toaster function
  const getFileErrorMessage = (data) => {
    setActiveErrorClass(true)

    let errorExeptionMessage: string;
    switch (data) {
      case 3001:
        errorExeptionMessage = t("toaster.error.files.file_already_exists")
        break
      case 3002:
        errorExeptionMessage = t("toaster.error.files.file_not_found")
        break
      case 3013:
        errorExeptionMessage = t("toaster.error.files.file_not_deleted")
        break
      case 500:
        errorExeptionMessage = t("toaster.error.files.internal_server_error")
        break
      default:
        errorExeptionMessage = ""
    }
    setFileErrors(errorExeptionMessage)
  }

  // set toaster for delete file
  useEffect(() => {
    if (!fileDeleteLoading && fileDeleteData) {
      setLoadingOnDeleteFile(false)
      getFileToasterMessage(t("toaster.success.files.file_deleted"))
    }
    if (!fileDeleteLoading && fileDeleteError) {
      setLoadingOnDeleteFile(false)
      getFileErrorMessage(fileDeleteError?.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [fileDeleteLoading])


  const downloadFiles = (data) => {
    setFileName(data);
    downloadsContext.downloadItem(data)
  }

  const viewFiles = (data) => {
    setFileName(data);
    downloadsContext.viewItem(data)
  }

  const uploadNewVersion = (data) => {

    setFileVersion(data);
    setOpenNew(true)
  }

  const addPinTask = (data) => {
    setFileName(data);
    downloadsContext.viewItem(data)
  }

  const cancel = () => {
    setOpenNew(false)
  }

  const uploadNewVersionFile = (data) => {

    setOpenNew(false)
    addFile({
      variables: {
        projectId,
        projectTitle: "Test project title for file version",
        parentUploadedFileID: data.uploadedFileID,
        structureID: data.structureID,
        structureTitle: data.structureTitle,
        BKPID: data.BKPID,
        BKPIDTitle: data.BKPIDTitle,
        phaseID: data.phaseID,
        phaseName: data.phaseName,
        generateFileName: true,
        fileTypeID: data.fileTypeID,
        fileTypeName: data.fileTypeName,
        isEveryOneAllowed: true,
        fileURL: data.fileURL,
        fileTitle: data.fileTitle,
        fileType: data.fileType,
        fileVersion: 2,
        isDeleted: false,
        // peoples: data.peoples,
        directory: data.directory
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
            uploadedFiles: [...cacheData.uploadedFiles, data['createFile']]
          }
        });
      }
    });

  }

  const getSelectedFileId = (fileId) => {
    setSelectedFileId(fileId)
  }

  enum ReferenceType {
    COMPANY = "COMPANY"
  }

  useEffect(() => {
    axios({
      url: MS_SERVICE_URL['ms_account'].url,
      method: 'post',
      data: {
        query: `query { 
            references( 
              referenceFilter: { referenceID: "${props.companyId}", referenceType:${ReferenceType.COMPANY} } 
            ){ 
              users{
                userID
                userName
                imageUrl
                email
              }
            } 
        }`
      }
    }).then((result) => {

      if (result.data.data.references.users) {
        const userDetails = result.data.data.references.users.filter((user) => user.email === props.loggedUserEmail)
        if (userDetails.length) {
          dispatch({ type: documentAction.LOGGED_USER_ID, payload: userDetails[0].userID })
          dispatch({ type: documentAction.LOGGED_USER_NAME, payload: userDetails[0].userName })
          dispatch({ type: documentAction.LOGGED_USER_PROFILE_URL, payload: userDetails[0].imageUrl })
          const loggedUserDetail = {
            loggedUserEmail: userDetails[0].email,
            loggedUserID: userDetails[0].userID,
            loggedUserName: userDetails[0].userName,
            loggedUserProfileURL: userDetails[0].imageUrl
          }
          localStorage.setItem('loggedUserDetail', JSON.stringify(loggedUserDetail));
        }
      }

    });
  }, [])

  const OpenDeleteFileConfirm = (data) => {
    setFilesData(data)
    setOpenDeleteFile(true)
  }

  const onConfirmDeleteFile = (isConfirm, filesData) => {
    console.log('--file-listing--onConfirmDeleteFile--data--', isConfirm, filesData)

    setLoadingOnDeleteFile(true)

    deleteFileAPI({
      variables: {
        uploadedFileID: filesData.uploadedFileID,
      },
      update: (cache) => {
        const cacheData = cache.readQuery({
          query: GET_FILES,
          variables: { projectId },
        }) as IFiles;

        // const newFiles = cacheData?.uploadedFiles?.filter(
        //   (item) => item.uploadedFileID !== filesData.uploadedFileID
        // );
        const newFiles = cacheData?.uploadedFiles?.map((item) => {
          return item?.children?.filter((item) => item.uploadedFileID !== filesData.uploadedFileID)
        });

        cache.writeQuery({
          query: GET_FILES,
          variables: { projectId },
          data: {
            uploadedFiles: newFiles,
          },
        });
      },
    });

    setOpenDeleteFile(false);
  }

  const onCloseDeleteFile = (isOpenConfirmDeletePopup) => {
    setOpenDeleteFile(false)
  }



  if (loadingOnDeleteFile) return (<LazyLoading />)


  return (
    <div>
      <ToastContainer className={`${activeErrorClass ? "error" : "success"}`} position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />

      {loading ?
        <LoaderPage /> :
        <div>
          {openNew ?
            <UploadNewVersion
              opennewF={true}
              cancel={cancel}
              uploadNewVersion={uploadNewVersionFile}
              file={fileVersion}
            /> : null}

          {openDeleteFile ?
            <DeleteFileConfirm
              openAlert={openDeleteFile}
              fileData={filesData}
              confirm={onConfirmDeleteFile}
              cancel={onCloseDeleteFile}
            />
            : null}

          <FileListingStructure
            files={data?.uploadedFiles}
            downloadFiles={downloadFiles}
            viewFiles={viewFiles}
            uploadNewVersion={uploadNewVersion}
            addPinTask={addPinTask}
            downloadedImg={itemsd}
            selectedFileId={getSelectedFileId}
            fileVersionDetail={selectedFileVersions?.fileVersions}
            fileVersionLoading={fileVersionLoading}
            openDeleteFile={OpenDeleteFileConfirm}
          ></FileListingStructure>
          {/* {itemsd.map((item, i) => (
            <div key={i}>
              {item.containerName}:
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.filename}
              </a>
            </div>
          ))} */}
        </div>
      }

    </div>
  );
}

// export default FileListing;
const mapStateToProps = state => ({
  companyId: state.app.selectedCompany.selectedCompanyId,
  loggedUserEmail: state.app.loggedUserDetail.loggedUserEmail
})

export default connect(mapStateToProps)(FileListing)