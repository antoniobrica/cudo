import React, { useState } from 'react';

import './../../../assets/style/index.scss'
import { Tab, Accordion, Dropdown } from 'semantic-ui-react'
import { MS_SERVICE_URL } from '@cudo/mf-core';

import { LazyLoading } from '@cudo/shared-components';
import moment from 'moment';

/* eslint-disable-next-line */
export interface FileStructureProps {
	files?,
	downloadFiles,
	downloadedImg,
	viewFiles,
	uploadNewVersion,
	isPinFile,
	selectedFileId?,
	fileVersionDetail?,
	fileVersionLoading?,
}

export function PinFileStructure(props: FileStructureProps) {
	const [view, setView] = React.useState(false);
	// const [expand, setExpand] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [filesData, setFilesData] = React.useState([]);
	const [items, setItems] = React.useState([]);
	const [imgUrl, setimgUrl] = React.useState('');
	const [fname, setFname] = React.useState('');
	const [fType, setFtype] = React.useState('');
	const [isPinFile, setIsPinFile] = React.useState(false);

	const [fileId, setFileId] = React.useState('');
	const [selectedFile, setSelectedFile] = React.useState(null)


	const [fileFoldersList, setFileFoldersList] = useState([])
	const [expand, setExpand] = useState(false);
	const [selectedExpandId, setSelectedExpandId] = useState(null);

	const [expandVersion, setExpandVersion] = useState(false);
	const [selectedExpandVersionId, setSelectedExpandVersionId] = useState(null);



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

	// const download = (data) => {
	// 	props.downloadFiles(data)
	// }
	// const expandFolder = (data) => {
	// 	setExpand(true);
	// 	setFilesData(data)
	// }
	React.useEffect(() => {
		if (selectedFile) {
			if (props.downloadedImg) {
				for (let i = 0; i < props.downloadedImg.length; i++) {
					if (props.downloadedImg[i].filename == filesData['fileTitle']) {
						setFileId(props.downloadedImg[i].url)
						setimgUrl(props.downloadedImg[i].url);
					}
				}

			}
		}
	}, [selectedFile])

	const uploadNewVersion = (file) => {
		props.uploadNewVersion(file);
	}

	React.useEffect(() => {
		if (props.files) {
			setFileFoldersList(props.files)
			// setItems(props.files.map((file, i) => ({ key: i, title: file.directory ? file.directory : file.BKPIDTitle, content: { content: (renderItems(file.children)) } })));
		}
	}, [props.files]);


	// #region Commented old code
	// const renderItems = (childrenFiles) => {
	// 	const files = childrenFiles.map((singleFileItem) => {
	// 		const { uploadedFileID, fileType, fileTitle } = singleFileItem

	// 		return (
	// 			<div key={uploadedFileID} className="card1 card-custom gutter-b width_card" >
	// 				<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
	// 					<div className="d-flex align-items-center py-2">
	// 						<span>
	// 							{fileType == ("image/jpeg" || "image/png")
	// 								?
	// 								<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} className="  mr-10 " /> :
	// 								<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pdf.png`} className="  mr-10 " />
	// 							}
	// 						</span>

	// 						<span className="font-weight-bold mb-0 mr-10">{fileTitle}</span>
	// 						{/* <div className="d-flex mr-3">
	// 							<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
	// 								<div className="navi-item mr-2">
	// 									<button className="ui mini button grey-btn">{file.fileVersion}</button>
	// 								</div>
	// 							</div>
	// 						</div> */}
	// 					</div>
	// 					<div className="symbol-group symbol-hover">
	// 						<div>
	// 							{/* <a onClick={() => download(file.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a> */}
	// 							{/* <a onClick={() => viewFile(file)}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a> */}

	// 							<a onClick={() => viewFile(singleFileItem)} className="navi-link active" >
	// 								<img src={selectedFile === uploadedFileID ?
	// 									`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/circle_blue.png`
	// 									:
	// 									`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/grey_circle.png`} />
	// 							</a>

	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		)
	// 	})
	// 	return files;
	// }
	// #endregion

	const onClickExpand = (uploadedFileId) => {
		if (uploadedFileId === selectedExpandId) {
			setExpand(!expand)
		} else {
			setExpand(true)
		}
		setSelectedExpandId(uploadedFileId)
	}

	const onClickFileVersion = (uploadedFileVersionId) => {
		if (uploadedFileVersionId === selectedExpandVersionId) {
			setExpandVersion(!expandVersion)
		} else {
			setExpandVersion(true)
		}

		setSelectedExpandVersionId(uploadedFileVersionId)
		props.selectedFileId(uploadedFileVersionId)
	}

	const onClickVersionDetail = () => {

	}

	const renderChildrenSingleFile = (singleFileItem) => {
		const { uploadedFileID, fileType, fileTitle, fileVersion, versionCount } = singleFileItem
		return (
			<div key={uploadedFileID} className={selectedExpandVersionId === uploadedFileID && expandVersion ? "single-files-list expand" : "single-files-list"}>
				<div className="files-left-area">
					<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
					<h3 className="files-name">{fileTitle}</h3>
					{versionCount > 0 ? <span className="version-files"><a onClick={() => onClickFileVersion(uploadedFileID)}>Ver {versionCount}</a></span> : null}
				</div>

				{versionCount > 0 ?
					<div className="files-arrows" onClick={() => onClickFileVersion(uploadedFileID)}>
						<i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
					</div> :
					<div className="files-right-area">
						<div className="symbol-group symbol-hover">
							<div className="symbol symbol-30">
								<a onClick={() => viewFile(singleFileItem)} className={selectedFile === uploadedFileID ? "selected" : ""}> <i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
							</div>
						</div>
					</div>}

				{props.fileVersionLoading && selectedExpandVersionId === uploadedFileID ?
					<>
						<div className="break" />
						<div className="version-file-con">
							<LazyLoading />
						</div>
					</>
					:
					<>
						{props?.fileVersionDetail?.children?.length ?
							<>
								<div className="break"></div>
								<div className="version-file-con">
									{props?.fileVersionDetail?.children.map((versionFileItem) => {

										const { uploadedFileID, fileType, fileTitle, fileVersion, createdBy, updatedBy, createdAt, updatedAt } = versionFileItem
										const formattedCreatedAt = moment(createdAt).format('DD MMM, YYYY')
										const formattedUpdatedAt = moment(updatedAt).format('DD MMM, YYYY')

										return (<div key={uploadedFileID} className="files-versioning-list">
											<p>Version {fileVersion} - <span>{fileTitle}</span> <span className="small-text">(By: {updatedBy ? updatedBy : createdBy} - Uploaded on: {updatedAt ? formattedUpdatedAt : formattedCreatedAt})</span></p>
											<div className="files-right-area">
												<a onClick={() => viewFile(versionFileItem)} className={selectedFile === uploadedFileID ? "selected" : ""}> <i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
											</div>
										</div>)
									})}
								</div>
							</> : null}
					</>
				}
			</div>
		)
	}

	const renderChildrenWise = (children) => {
		const renderedChildrenItem = children && children.length ? children.map((item) => {
			return (<>
				{renderChildrenSingleFile(item)}
			</>)
		}) : null
		return renderedChildrenItem
	}

	let renderedFileFoldersList = null
	if (fileFoldersList && fileFoldersList.length) {
		renderedFileFoldersList = fileFoldersList.map(({ parentUploadedFileID, uploadedFileID, directory, BKPIDTitle, children }) => {

			return (
				<div key={uploadedFileID} className={selectedExpandId === uploadedFileID && expand ? "multiple-files-box expand" : "multiple-files-box"}>
					<div className="multiple-files-header">
						<div className="files-left-area">
							<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/folder.png`} />
							<h3 className="files-name">{parentUploadedFileID === null && directory ? directory : BKPIDTitle} {/*(2) */}</h3>
							{children && children?.length ? <span className="no-of-files">( {children?.length} files )</span> : null}
						</div>
						{children && children?.length > 0 ?
							<div className="files-arrows" onClick={() => onClickExpand(uploadedFileID)}>
								<i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
							</div> :
							null}
					</div>

					<div className="multiple-files-listing">
						{renderChildrenWise(children)}
					</div>
				</div>
			)
		})
	}


	return (
		<div className=" navbar-collapse">
			{/* {view && imgUrl.length > 0 ?
                <div>
                    <ViewFileDetail open={view} fType={fType} filesData={filesData} dowloadFilesData={props.downloadedImg} ></ViewFileDetail>
                </div> : null} */}

			{/* <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} /> */}
			<div>
				{/* <Accordion className="widtharea" defaultActiveIndex={0} panels={items} style={{ border: '0px' }} >
				</Accordion> */}


				{/* new file structure */}
				<div className="all-files-con select-file-popup-area">
					{renderedFileFoldersList}
					{/* <div>--------------------------------------</div>
					<>
						<div className="multiple-files-box expand">
							<div className="multiple-files-header">
								<div className="files-left-area">
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/folder.png`} />
									<h3 className="files-name">Information Data (2)</h3>
									<span className="no-of-files">( 5 files )</span>
								</div>
								<div className="files-arrows">
									<i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
								</div>
							</div>
							<div className="multiple-files-listing">
								<div className="single-files-list expand">
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
										<span className="version-files"><a>Ver 2</a></span>
									</div>
									<div className="files-arrows">
										<i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
									</div>

									<div className="break"></div>

									<div className="version-file-con">
										<div className="files-versioning-list">
											<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
											<div className="files-right-area">
												<a href="" className="selected"> <i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
											</div>
										</div>
										<div className="files-versioning-list">
											<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
											<div className="files-right-area">
												<a href=""> <i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
											</div>
										</div>
									</div>
								</div>

								<div className="single-files-list">
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""> <i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="multiple-files-box">
							<div className="multiple-files-header">
								<div className="files-left-area">
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/folder.png`} />
									<h3 className="files-name">Information Data</h3>
									<span className="no-of-files">( 5 files )</span>
								</div>
								<div className="files-arrows">
									<i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
								</div>
							</div>
							<div className="multiple-files-listing">
								<div className="single-files-list">
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""><i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i></a>
											</div>
										</div>
									</div>
								</div>

								<div className="single-files-list">
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="single-file-box">
							<div className="single-files-list">
								<div className="files-left-area">
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
									<h3 className="files-name">file_name.pdf</h3>
								</div>
								<div className="files-right-area">
									<div className="symbol-group symbol-hover">
										<div className="symbol symbol-30">
											<a href=""><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="single-file-box">
							<div className="single-files-list">
								<div className="files-left-area">
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
									<h3 className="files-name">file_name.pdf</h3>
									<span className="version-files"><a href="">Ver 2</a></span>
								</div>
								<div className="files-right-area">
									<div className="symbol-group symbol-hover">
										<div className="symbol symbol-30">
											<a href=""><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="version-file-con">
								<div className="files-versioning-list">
									<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
									<div className="files-right-area">
										<a href=""><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
									</div>
								</div>
								<div className="files-versioning-list">
									<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
									<div className="files-right-area">
										<a href=""><i className="ms-Icon ms-Icon--Accept" aria-hidden="true"></i></a>
									</div>
								</div>
							</div>
						</div>

					</> */}
				</div>

			</div>
		</div>
	);
}

export default PinFileStructure;
