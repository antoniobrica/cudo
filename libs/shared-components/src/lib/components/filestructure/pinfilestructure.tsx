import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Accordion, Dropdown } from 'semantic-ui-react'

import img4 from 'libs/shared-components/src/folder.png';
import img5 from 'libs/shared-components/src/image2.png';
import img6 from 'libs/shared-components/src/eyeview.png';
import img1 from 'libs/shared-components/src/powerpoint.png';
import img2 from 'libs/shared-components/src/pdf.png';
import img from 'libs/shared-components/src/user2.png';
import img8 from 'libs/shared-components/src/circle_blue.png';
import img9 from 'libs/shared-components/src/grey_circle.png';
import ViewFileDetail from '../modal/viewdetailsfile';
import AddPinFile from '../modal/pinaddfile';
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

    const [tick, setTick] = React.useState([[]]);
    const [isTick, setIsTick] = React.useState('');
    const [fileId, setFileId] = React.useState('');

    React.useEffect(() => {
        if (props.isPinFile) {
            console.log('isPinFile', props.isPinFile);

            setIsPinFile(props.isPinFile)
        }
    }, [props.isPinFile])
    // const tick = () => {
    //     setIsTick(t => !t)
    //     console.log();

    //     console.log('istibcj', isTick);

    // }

    const viewFile = (data, id) => {
        console.log('tick', isTick);

        setIsTick(id)
        console.log('tick', isTick);

        console.log('viewfile', data);
        setFtype(data.fileType);
        setView(true);
        setFilesData(data);

        props.viewFiles(data)
    }

    const download = (data) => {
        console.log('download');
        props.downloadFiles(data)
    }
    const expandFolder = (data) => {
        setExpand(true);
        setFilesData(data)
    }
    React.useEffect(() => {
        if (props.downloadedImg) {
            console.log('downloadedImg', props.downloadedImg);
            for (let i = 0; i < props.downloadedImg.length; i++) {
                if (props.downloadedImg[i].filename == filesData['fileTitle']) {
                    console.log('url', props.downloadedImg[i].url);
                    setFileId(props.downloadedImg[i].url)
                    setimgUrl(props.downloadedImg[i].url);
                }
            }

        }
    })
    const uploadNewVersion = (file) => {
        console.log('file', file);
        props.uploadNewVersion(file);

    }
    React.useEffect(() => {
        if (props.files) {
            setItems(props.files.map((file, i) => ({ key: i, title: file.directory ? file.directory : file.BKPIDTitle, content: { content: (renderItems(file.children, i)) } })));
        }
    }, [props.files]);


    const renderItems = (data, i) => {

        const files = data.map((data, id) => {
            return (
                <div className="card1 card-custom gutter-b width_card" >

                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

                        <div className="d-flex align-items-center py-2">
                            <span>
                                {data.fileType == ("image/jpeg" || "image/png")
                                    ?
                                    <img src={img5} className="  mr-10 " /> :
                                    <img src={img2} className="  mr-10 " />
                                }

                            </span>

                            <span className="font-weight-bold mb-0 mr-10">{data.fileTitle}</span>
                            {/* <div className="d-flex mr-3">

								<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

									<div className="navi-item mr-2">
										<button className="ui mini button grey-btn">{file.fileVersion}</button>
									</div>

								</div>

							</div> */}

                        </div>

                        <div className="symbol-group symbol-hover">
                            <div style={{ marginTop: '-33px' }}>
                                {/* <a onClick={() => download(file.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a> */}
                                {/* <a onClick={() => viewFile(file)}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a> */}
                                <a
                                    onClick={() => viewFile(data, i)}
                                    className="navi-link active"
                                    style={{ marginLeft: '320px' }}
                                >
                                    <img src={img9} />

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
                <Accordion className="widtharea" defaultActiveIndex={0} panels={items}   style={{border:'0px'}} >


                </Accordion>



            </div>
        </div>



    );
}

export default PinFileStructure;
