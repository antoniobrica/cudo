import React, { useState, useEffect } from 'react';

import './../../../assets/style/index.scss'
import { Tab, Accordion, Dropdown } from 'semantic-ui-react'
import ViewFileDetail from '../modal/viewdetailsfile';
import AddPinFile from '../modal/pinaddfile';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { LazyLoading } from '@cudo/shared-components';
import { AddFileSettingUpload, EditFileSettingUpload } from '@cudo/mf-document-lib'
import moment from 'moment';
import { truncate } from 'fs';

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

	const [fileView, setFileView] = useState(false);
	const [openPinFile, setOpenPinFile] = useState(false)

	const [designVersionExpand, setDesignVersionExpand] = useState(false)

	const [isVersionSelected, setIsVersionSelected] = useState(false)
	const [selectedVersionFileId, setSelectedVersionFileId] = useState(null)
	const [selectedFileVersionList, setSelectedFileVersionList] = useState(null)

	const [openEditFile, setOpenEditFile] = useState(false)

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

	const onClickViewFileDetail = (data, isFromVersion, selectedVersionFileId, versionList) => {

		setFtype(data.fileType);
		setFileView(true);
		setFilesData(data);

		setIsVersionSelected(isFromVersion)
		setSelectedVersionFileId(selectedVersionFileId)
		setSelectedFileVersionList(versionList)
		props.viewFiles(data.fileTitle)
	}

	const onClickFileDownload = (data) => {
		props.downloadFiles(data)
	}

	const uploadNewVersion = (file) => {
		props.uploadNewVersion(file);

	}

	const addPinTask = (data, isFromVersion) => {

		setIsVersionSelected(isFromVersion)
		setFilesData(data)
		setFtype(data.fileType);
		setOpenPinFile(true)
		props.addPinTask(data.fileTitle)
	}

	const savePins = (data) => {
		setOpenPinFile(false)
	}

	const cancelOpenPinFile = () => {
		setOpenPinFile(false)
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

	const getCloseDetailView = (isOpenPopup) => {
		setFileView(false)
	}

	const getFileByVersion = (fileTitle) => {
		props.viewFiles(fileTitle)
	}

	const onClickEditFile = (fileData) => {
		setFilesData(fileData)
		setOpenEditFile(true)
	}

	const getCloseEditFile = (isOpenPopup) => {
		setOpenEditFile(false)
	}


	const renderChildrenSingleFile = (singleFileItem) => {
		// const { uploadedFileID, fileType, fileTitle, fileVersion, versionCount, taskCount, commentCount } = singleFileItem
		return (
			<div key={singleFileItem.uploadedFileID} className={selectedExpandVersionId === singleFileItem.uploadedFileID && expandVersion ? "single-files-list expand" : "single-files-list"}>
				<div className="files-left-area">
					<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} />
					<h3 className="files-name">{singleFileItem.fileTitle}</h3>
					<span className="no-of-files" onClick={() => onClickViewFileDetail(singleFileItem, false, null, null)}><i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> {singleFileItem.commentCount} comments</span>
					<span className="no-of-files" onClick={() => onClickViewFileDetail(singleFileItem, false, null, null)}><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> {singleFileItem.taskCount} tasks</span>
					{singleFileItem.versionCount > 0 ? <span className="version-files"><a onClick={() => onClickFileVersion(singleFileItem.uploadedFileID)}>Ver {singleFileItem.versionCount}</a></span> : null}
				</div>

				<div className="files-right-area">
					<div className="symbol-group symbol-hover">
						<div className="symbol symbol-30">
							<a onClick={() => onClickFileDownload(singleFileItem.fileTitle)}> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
							<a onClick={() => onClickViewFileDetail(singleFileItem, false, null, null)}> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>

							<span>
								<Dropdown icon='ellipsis horizontal' pointing='right'>
									<Dropdown.Menu>
										<Dropdown.Item icon='pencil' text='Edit file detail' onClick={() => onClickEditFile(singleFileItem)} />
										<Dropdown.Item icon='eye' text='Upload new version' onClick={() => uploadNewVersion(singleFileItem)} />
										<Dropdown.Item icon='check circle outline' text='Add task to this file' onClick={() => addPinTask(singleFileItem, false)} />
										<Dropdown.Item icon='trash alternate outline' text='Delete' />
									</Dropdown.Menu>
								</Dropdown>
							</span>
						</div>
					</div>
				</div>

				{props.fileVersionLoading && selectedExpandVersionId === singleFileItem.uploadedFileID ?
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
									{props?.fileVersionDetail?.children.map((item) => {

										const { uploadedFileID, fileType, fileTitle, fileVersion, createdBy, updatedBy, createdAt, updatedAt } = item
										const formattedCreatedAt = moment(createdAt).format('DD MMM, YYYY')
										const formattedUpdatedAt = moment(updatedAt).format('DD MMM, YYYY')

										return (<div key={uploadedFileID} className="files-versioning-list">
											<p>Version {fileVersion} - <span>{fileTitle}</span> <span className="small-text">(By: {updatedBy ? updatedBy : createdBy} - Uploaded on: {updatedAt ? formattedUpdatedAt : formattedCreatedAt})</span></p>
											<div className="files-right-area symbol symbol-30">
												<a onClick={() => onClickFileDownload(fileTitle)}> <i className="ms-Icon ms-Icon--Download" aria-hidden="true"></i></a>
												<a onClick={() => onClickViewFileDetail(item, true, uploadedFileID, props?.fileVersionDetail?.children)}> <i className="ms-Icon ms-Icon--RedEye" aria-hidden="true"></i></a>
												<span>
													<Dropdown icon='ellipsis horizontal' pointing='right'>
														<Dropdown.Menu>
															<Dropdown.Item icon='pencil' text='Edit file detail' />
															{/* <Dropdown.Item icon='eye' text='Upload new version' onClick={() => uploadNewVersion(singleFileItem)} /> */}
															<Dropdown.Item icon='check circle outline' text='Add task to this file' onClick={() => addPinTask(item, true)} />
															<Dropdown.Item icon='trash alternate outline' text='Delete' />
														</Dropdown.Menu>
													</Dropdown>
												</span>
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
			menuItem: { key: 'Overview', icon: 'images', content: 'All files', className: 'files-tab-inner' },
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
		<div className="files-tab-outer tabs-main-info-container">
			{/* {fileView && imgUrl.length > 0 ? */}
			{fileView ?
				<div>
					<ViewFileDetail
						open={fileView}
						fType={fType}
						filesData={filesData}
						dowloadFilesData={props.downloadedImg}
						cancel={getCloseDetailView}
						isVersionSelected={isVersionSelected}
						selectedVersionFileId={selectedVersionFileId}
						selectedFileVersionList={selectedFileVersionList}
						onChangedFileVersion={getFileByVersion}
					></ViewFileDetail>
				</div> : null}
			{openPinFile ?
				<div>
					<AddPinFile
						isOpen={openPinFile}
						cancel={cancelOpenPinFile}
						filesData={filesData}
						dowloadFilesData={props.downloadedImg}
						savePin={savePins}
						onSuccess={""}
						isVersionSelected={isVersionSelected}
					/>
				</div>
				: null}
			{openEditFile ?
				<EditFileSettingUpload open={openEditFile} filesData={filesData} cancel={getCloseEditFile} />
				: null}

			<Tab className="ui-tabs work-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
		</div>
	);
}

export default FileStructure;
