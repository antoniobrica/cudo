import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Accordion, Dropdown } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';
/* eslint-disable-next-line */
export interface FileStructureProps {
    files?,
    downloadFiles,
    downloadedImg,
    viewFiles,
    uploadNewVersion,
    isPinFile
}

export function PinFileStructure(props: FileStructureProps) {
    const [view, setView] = React.useState(false);
    const [expand, setExpand] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [filesData, setFilesData] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [imgUrl, setimgUrl] = React.useState('');
    const [fname, setFname] = React.useState('');
    const [fType, setFtype] = React.useState('');
    const [isPinFile, setIsPinFile] = React.useState(false);

    const [fileId, setFileId] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null)

    React.useEffect(() => {
        if (props.isPinFile) {            
            setIsPinFile(props.isPinFile)
        }
    }, [props.isPinFile])

    const viewFile = (data) => {
        if (selectedFile !== data.uploadedFileID) {
            setSelectedFile(data.uploadedFileID)
        } else {
            setSelectedFile(null)
        }

        setFtype(data.fileType);
        setFilesData(data);
        props.viewFiles(data)
    }

    const download = (data) => {
        console.log('--pinfilestructure--download');
        props.downloadFiles(data)
    }
    const expandFolder = (data) => {
        setExpand(true);
        setFilesData(data)
    }
    React.useEffect(() => {
       if (selectedFile) {
            if (props.downloadedImg) {
                console.log('--pinfilestructure--useEffect--downloadedImg', props.downloadedImg);
                for (let i = 0; i < props.downloadedImg.length; i++) {
                    if (props.downloadedImg[i].filename == filesData['fileTitle']) {
                        console.log('--pinfilestructure--useEffect--url', props.downloadedImg[i].url);
                        setFileId(props.downloadedImg[i].url)
                        setimgUrl(props.downloadedImg[i].url);
                    }
                }

            }
        }
    }, [selectedFile])

    const uploadNewVersion = (file) => {
        console.log('--pinfilestructure--uploadNewVersion--file', file);
        props.uploadNewVersion(file);
    }

    React.useEffect(() => {
        if (props.files) {
            setItems(props.files.map((file, i) => ({ key: i, title: file.directory ? file.directory : file.BKPIDTitle, content: { content: (renderItems(file.children)) } })));
        }
    }, [props.files, selectedFile]);

    const renderItems = (childrenFiles) => {
        const files = childrenFiles.map((singleFileItem) => {
            const { uploadedFileID, fileType, fileTitle } = singleFileItem

            return (
                <div key={uploadedFileID} className="card1 card-custom gutter-b width_card" >
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center py-2">
                            <span>
                                {fileType == ("image/jpeg" || "image/png")
                                    ?
                                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} className="  mr-10 " /> :
                                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pdf.png`} className="  mr-10 " />
                                }
                            </span>

                            <span className="font-weight-bold mb-0 mr-10">{fileTitle}</span>
                            {/* <div className="d-flex mr-3">
								<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
									<div className="navi-item mr-2">
										<button className="ui mini button grey-btn">{file.fileVersion}</button>
									</div>
								</div>
							</div> */}
                        </div>
                        <div className="symbol-group symbol-hover">
                            <div>
                                {/* <a onClick={() => download(file.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a> */}
                                {/* <a onClick={() => viewFile(file)}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a> */}

                                <a onClick={() => viewFile(singleFileItem)} className="navi-link active" >
                                    <img src={selectedFile === uploadedFileID ?
                                        `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/circle_blue.png`
                                        :
                                        `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/grey_circle.png`} />
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return files;
    }


    return (
        <div className=" navbar-collapse " style={{ marginTop: '-36px', marginLeft: '-19px' }}>
            {/* {view && imgUrl.length > 0 ?
                <div>
                    <ViewFileDetail open={view} fType={fType} filesData={filesData} dowloadFilesData={props.downloadedImg} ></ViewFileDetail>
                </div> : null} */}

            {/* <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} /> */}
            <div className=" " style={{ width: '100%' }}>
                <Accordion className="widtharea" defaultActiveIndex={0} panels={items} style={{ border: '0px' }} >


                </Accordion>



            </div>
        </div>
    );
}

export default PinFileStructure;
