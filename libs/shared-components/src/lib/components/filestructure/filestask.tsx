import React, { useState, useEffect } from 'react';

import './../../../assets/style/index.scss'
import { Tab, Accordion, Dropdown } from 'semantic-ui-react'
import ViewFileDetail from '../modal/viewdetailsfile';
import AddPinFile from '../modal/pinaddfile';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { LazyLoading } from '@cudo/shared-components';

/* eslint-disable-next-line */
export interface FileStructureProps {
	files?,
	downloadFiles?,
	downloadedImg?,
	viewFiles?,
	uploadNewVersion?,
	addPinTask?
	selectedFileId?
	fileVersionDetail?
	fileVersionLoading?
}

export function FileStructure(props: FileStructureProps) {
	const [filesData, setFilesData] = useState([]);
	const [items, setItems] = useState([]);
	const [imgUrl, setimgUrl] = useState('');
	const [fType, setFtype] = useState('');

	const [fileFoldersList, setFileFoldersList] = useState([])
	const [expand, setExpand] = useState(false);
	const [selectedExpandId, setSelectedExpandId] = useState(null);

	const [expandVersion, setExpandVersion] = useState(false);
	const [selectedExpandVersionId, setSelectedExpandVersionId] = useState(null);

	const [view, setView] = useState(false);
	const [openPinFile, setOpenPinFile] = useState(false)

	const [designVersionExpand, setDesignVersionExpand] = useState(false)

	useEffect(() => {
		if (props.files) {
			setFileFoldersList(props.files)
			// setItems(props.files.map((file, i) => ({ key: i, title: file.directory ? file.directory : file.BKPIDTitle, content: { content: (renderItems(file.children)) } })));
		}
	}, [props.files]);

	useEffect(() => {
		if (!props.fileVersionLoading && props.fileVersionDetail) {
			setExpandVersion(true)
		}
	}, [props.fileVersionLoading, props.fileVersionDetail]);

	useEffect(() => {
		if (props.downloadedImg) {

			for (let i = 0; i < props.downloadedImg.length; i++) {
				if (props.downloadedImg[i].filename == filesData['fileTitle']) {
					setimgUrl(props.downloadedImg[i].url);
				}
			}

		}
	}, [props.downloadedImg])

	const onClickViewFileDetail = (data) => {
		setFtype(data.fileType);
		setView(true);
		setFilesData(data);

		props.viewFiles(data.fileTitle)
	}

	const onClickFileDownload = (data) => {
		props.downloadFiles(data)
	}

	const uploadNewVersion = (file) => {
		props.uploadNewVersion(file);

	}

	const addPinTask = (data) => {

		setFilesData(data)
		setFtype(data.fileType);
		setOpenPinFile(true)
		props.addPinTask(data.fileTitle)
	}

	const savePins = (data) => {
		console.log('savePins==>', data);

	}

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

	// #region commented Old code
	// const expandFolder = (data) => {
	// 	setExpand(true);
	// 	setFilesData(data)
	// }

	// const rootPanels = [
	// 	{ key: 'panel-1', title: 'General', content: { content: <a href=''>+ Add item</a> }, },
	// 	{ key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''><i className="ms-Icon ms-font-xl ms-Icon--Add"></i> Add item</a> } },
	// ]

	// const renderItems = (data) => {


	// 	const files = data.map((data) => {
	// 		return (
	// 			<div className="card1 card-custom gutter-b width_card">

	// 				<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

	// 					<div className="d-flex align-items-center py-2">
	// 						<span>
	// 							{data.fileType == ("image/jpeg" || "image/png")
	// 								?
	// 								<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} className="  mr-10 " /> :
	// 								<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pdf.png`} className="  mr-10 " />
	// 							}

	// 						</span>

	// 						<span className="mb-0 mr-10 file-name-extension">{data.fileTitle}</span>
	// 						{data.fileVersion > 0 ?
	// 							<div className="d-flex mr-3">

	// 								<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

	// 									<div className="navi-item mr-2">
	// 										<button className="ui mini button primary">Ver {data.fileVersion}</button>
	// 									</div>

	// 								</div>

	// 							</div> :
	// 							null
	// 						}

	// 					</div>

	// 					<div className="symbol-group symbol-hover py-2">
	// 						<div className="symbol symbol-30">
	// 							<a onClick={() => onClickFileDownload(data.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
	// 							<a onClick={() => onClickViewFileDetail(data)}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

	// 							<span className="mr-2"  >
	// 								<Dropdown text='...' pointing='right'>
	// 									<Dropdown.Menu>
	// 										<Dropdown.Item icon='pencil' text='Edit file detail' />
	// 										<Dropdown.Item onClick={() => uploadNewVersion(data)} icon='eye' text='Upload new version' />
	// 										<Dropdown.Item onClick={() => addPinTask(data)} icon='check circle outline' text='Add task to this file' />
	// 										<Dropdown.Item icon='trash alternate outline' text='Delete' />
	// 									</Dropdown.Menu>
	// 								</Dropdown>
	// 							</span>

	// 						</div>

	// 					</div>

	// 				</div>
	// 			</div>
	// 		)
	// 	})
	// 	return files;
	// }
	// #endregion

	const renderChildrenSingleFile = (singleFileItem) => {
		const { uploadedFileID, fileType, fileTitle, fileVersion } = singleFileItem
		return (
			<div key={uploadedFileID} className={selectedExpandVersionId === uploadedFileID && expandVersion ? "single-files-list expand" : "single-files-list"}>
				<div className="files-left-area">
					<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
					<h3 className="files-name">{fileTitle}</h3>
					<span className="no-of-files"><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments</span>
					<span className="no-of-files"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks</span>
					<span className="version-files"><a onClick={() => onClickFileVersion(uploadedFileID)}>Ver 2</a></span>
				</div>
				<div className="files-right-area">
					<div className="symbol-group symbol-hover">
						<div className="symbol symbol-30">
							<a onClick={() => onClickFileDownload(fileTitle)}> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
							<a onClick={() => onClickViewFileDetail(singleFileItem)}> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

							<span>
								<Dropdown icon='ellipsis horizontal' pointing='right'>
									<Dropdown.Menu>
										<Dropdown.Item icon='pencil' text='Edit file detail' />
										<Dropdown.Item icon='eye' text='Upload new version' onClick={() => uploadNewVersion(singleFileItem)} />
										<Dropdown.Item icon='check circle outline' text='Add task to this file' onClick={() => addPinTask(singleFileItem)} />
										<Dropdown.Item icon='trash alternate outline' text='Delete' />
									</Dropdown.Menu>
								</Dropdown>
							</span>
						</div>
					</div>
				</div>

				{props.fileVersionLoading && selectedExpandVersionId === uploadedFileID ? (<LazyLoading />)
					:
					<>
						{props?.fileVersionDetail?.children?.length ?
							<>
								<div className="break"></div>
								<div className="version-file-con">
									{props?.fileVersionDetail?.children.map((item) => {

										const { uploadedFileID, fileType, fileTitle, fileVersion } = item
										return (<div key={uploadedFileID} className="files-versioning-list">
											<p>Version {fileVersion} - <span>{fileTitle}</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
											<div className="files-right-area">
												<a onClick={onClickVersionDetail}> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>
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

	const panes = [
		{
			menuItem: { key: 'Overview', icon: 'images', content: 'All files test', className: 'files-tab-inner' },
			render: () => <Tab.Pane attached={false}>
				<div className="ui-tabs">

				</div>

				<div className="ui card " style={{ width: '100%' }}>
					{/* <Accordion className="widtharea" defaultActiveIndex={0} panels={items} styled  >
					</Accordion> */}


					<div className="all-files-con">
						{renderedFileFoldersList}

						{/* <div>--------------------------------------</div>
						<>
						<div className="multiple-files-box expand">
							<div className="multiple-files-header">
								<div className="files-left-area">
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
									<h3 className="files-name">Information Data (2)</h3>
									<span className="no-of-files">( 5 files )</span>
								</div>
								<div className="files-arrows" onClick={onClickExpand}>
									<i className="ms-Icon ms-Icon--ChevronDown" aria-hidden="true"></i>
								</div>
							</div>
							<div className="multiple-files-listing">
								<div className={designVersionExpand ? "single-files-list expand" : "single-files-list"}>
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments</span>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks</span>
										<span className="version-files"><a onClick={onClickDesignVersionExpand}>Ver 2</a></span>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
												<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

												<span>
													<Dropdown icon='ellipsis horizontal' pointing='right'>
														<Dropdown.Menu>
															<Dropdown.Item icon='pencil' text='Edit file detail' />
															<Dropdown.Item icon='eye' text='Upload new version' />
															<Dropdown.Item icon='check circle outline' text='Add task to this file' />
															<Dropdown.Item icon='trash alternate outline' text='Delete' />
														</Dropdown.Menu>
													</Dropdown>
												</span>
											</div>
										</div>
									</div>

									<div className="break"></div>

									<div className="version-file-con">
										<div className="files-versioning-list">
											<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
											<div className="files-right-area">
												<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>
											</div>
										</div>
										<div className="files-versioning-list">
											<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
											<div className="files-right-area">
												<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>
											</div>
										</div>
									</div>
								</div>

								<div className="single-files-list">
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments</span>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks</span>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
												<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

												<span >
													<Dropdown icon='ellipsis horizontal' pointing='right'>
														<Dropdown.Menu>
															<Dropdown.Item icon='pencil' text='Edit file detail' />
															<Dropdown.Item icon='eye' text='Upload new version' />
															<Dropdown.Item icon='check circle outline' text='Add task to this file' />
															<Dropdown.Item icon='trash alternate outline' text='Delete' />
														</Dropdown.Menu>
													</Dropdown>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="multiple-files-box">
							<div className="multiple-files-header">
								<div className="files-left-area">
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
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
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments</span>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks</span>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
												<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

												<span>
													<Dropdown icon='ellipsis horizontal' pointing='right'>
														<Dropdown.Menu>
															<Dropdown.Item icon='pencil' text='Edit file detail' />
															<Dropdown.Item icon='eye' text='Upload new version' />
															<Dropdown.Item icon='check circle outline' text='Add task to this file' />
															<Dropdown.Item icon='trash alternate outline' text='Delete' />
														</Dropdown.Menu>
													</Dropdown>
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="single-files-list">
									<div className="files-left-area">
										<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
										<h3 className="files-name">file_name.pdf</h3>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments</span>
										<span className="no-of-files"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks</span>
									</div>
									<div className="files-right-area">
										<div className="symbol-group symbol-hover">
											<div className="symbol symbol-30">
												<a href=""> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
												<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

												<span >
													<Dropdown icon='ellipsis horizontal' pointing='right'>
														<Dropdown.Menu>
															<Dropdown.Item icon='pencil' text='Edit file detail' />
															<Dropdown.Item icon='eye' text='Upload new version' />
															<Dropdown.Item icon='check circle outline' text='Add task to this file' />
															<Dropdown.Item icon='trash alternate outline' text='Delete' />
														</Dropdown.Menu>
													</Dropdown>
												</span>
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
									<span className="no-of-files"><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments</span>
									<span className="no-of-files"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks</span>
								</div>
								<div className="files-right-area">
									<div className="symbol-group symbol-hover">
										<div className="symbol symbol-30">
											<a href=""> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
											<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

											<span >
												<Dropdown icon='ellipsis horizontal' pointing='right'>
													<Dropdown.Menu>
														<Dropdown.Item icon='pencil' text='Edit file detail' />
														<Dropdown.Item icon='eye' text='Upload new version' />
														<Dropdown.Item icon='check circle outline' text='Add task to this file' />
														<Dropdown.Item icon='trash alternate outline' text='Delete' />
													</Dropdown.Menu>
												</Dropdown>
											</span>
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
											<a href=""> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
											<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

											<span >
												<Dropdown icon='ellipsis horizontal' pointing='right'>
													<Dropdown.Menu>
														<Dropdown.Item icon='pencil' text='Edit file detail' />
														<Dropdown.Item icon='eye' text='Upload new version' />
														<Dropdown.Item icon='check circle outline' text='Add task to this file' />
														<Dropdown.Item icon='trash alternate outline' text='Delete' />
													</Dropdown.Menu>
												</Dropdown>
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="version-file-con">
								<div className="files-versioning-list">
									<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
									<div className="files-right-area">
										<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>
									</div>
								</div>
								<div className="files-versioning-list">
									<p>Version 2 - <span>file-name-pptx</span> <span className="small-text">(By: John Smith - Uploaded on: 20 Sep, 2020)</span></p>
									<div className="files-right-area">
										<a href=""> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>
									</div>
								</div>
							</div>
						</div>
					</> */}
					</div>


				</div>
			</Tab.Pane>,
		},
		{
			menuItem: { key: 'Task', icon: 'print', content: 'Send to print' },
			render: () => <Tab.Pane attached={false}>  Task</Tab.Pane>,
		},
	]

	return (
		<div className=" navbar-collapse files-tab-outer">
			{view && imgUrl.length > 0 ?
				<div>
					<ViewFileDetail open={view} fType={fType} filesData={filesData} dowloadFilesData={props.downloadedImg} ></ViewFileDetail>
					{/* <AddPinFile isOpen={view} filesData={filesData} dowloadFilesData={props.downloadedImg} savePin={savePins} onSuccess={""} /> */}
				</div> : null}
			{openPinFile && imgUrl.length > 0 ?
				<div>
					<AddPinFile isOpen={openPinFile} filesData={filesData} dowloadFilesData={props.downloadedImg} savePin={savePins} onSuccess={""} />
				</div> : null}

			<Tab className="ui-tabs work-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
		</div>
	);
}

export default FileStructure;
