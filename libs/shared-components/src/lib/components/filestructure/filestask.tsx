import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Accordion, Dropdown } from 'semantic-ui-react'
import ViewFileDetail from '../modal/viewdetailsfile';
import AddPinFile from '../modal/pinaddfile';
import { MS_SERVICE_URL } from '@cudo/mf-core';
/* eslint-disable-next-line */
export interface FileStructureProps {
	files?,
	downloadFiles?,
	downloadedImg?,
	viewFiles?,
	uploadNewVersion?,
	addPinTask?
}

export function FileStructure(props: FileStructureProps) {
	const [view, setView] = React.useState(false);
	const [expand, setExpand] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [filesData, setFilesData] = React.useState([]);
	const [items, setItems] = React.useState([]);
	const [imgUrl, setimgUrl] = React.useState('');
	const [fname, setFname] = React.useState('');
	const [fType, setFtype] = React.useState('');

	const [openPinFile, setOpenPinFile] = React.useState(false)


	const viewFile = (data) => {
		console.log('viewfile', data);
		setFtype(data.fileType);
		setView(true);
		setFilesData(data);

		props.viewFiles(data.fileTitle)
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
					setimgUrl(props.downloadedImg[i].url);
				}
			}

		}
	})
	const uploadNewVersion = (file) => {
		console.log('file', file);
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
	React.useEffect(() => {
		if (props.files) {
			console.log('files==', props.files);

			setItems(props.files.map((file, i) => ({ key: i, title: file.directory ? file.directory : file.BKPIDTitle, content: { content: (renderItems(file.children)) } })));
		}
	}, [props.files]);
	const renderItems = (data) => {
		console.log("files==>", data);

		const files = data.map((data) => {
			return (
				<div className="card1 card-custom gutter-b width_card">

					<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

						<div className="d-flex align-items-center py-2">
							<span>
								{data.fileType == ("image/jpeg" || "image/png")
									?
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/image2.png`} className="  mr-10 " /> :
									<img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/pdf.png`} className="  mr-10 " />
								}

							</span>

							<span className="mb-0 mr-10 file-name-extension">{data.fileTitle}</span>
							{data.fileVersion > 0 ?
								<div className="d-flex mr-3">

									<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

										<div className="navi-item mr-2">
											<button className="ui mini button primary">Ver {data.fileVersion}</button>
										</div>

									</div>

								</div> :
								null
							}

						</div>

						<div className="symbol-group symbol-hover py-2">
							<div className="symbol symbol-30">
								<a onClick={() => download(data.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
								<a onClick={() => viewFile(data)}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

								<span className="mr-2"  >
									<Dropdown text='...' pointing='right'>
										<Dropdown.Menu>
											<Dropdown.Item icon='pencil' text='Edit file detail' />
											<Dropdown.Item onClick={() => uploadNewVersion(data)} icon='eye' text='Upload new version' />
											<Dropdown.Item onClick={() => addPinTask(data)} icon='check circle outline' text='Add task to this file' />
											<Dropdown.Item icon='trash alternate outline' text='Delete' />
										</Dropdown.Menu>
									</Dropdown>
								</span>

							</div>

						</div>

					</div>
				</div>
			)
		})
		return files;
	}
	const rootPanels = [
		{ key: 'panel-1', title: 'General', content: { content: <a href=''>+ Add item</a> }, },
		{ key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''>+ Add item</a> } },
	]
	const panes = [
		{
			menuItem: { key: 'Overview', icon: 'images', content: 'All files test', className: 'files-tab-inner' },
			render: () => <Tab.Pane attached={false}>
				<div className="ui-tabs">

				</div>

				<div className="ui card " style={{ width: '100%' }}>
					<Accordion className="widtharea" defaultActiveIndex={0} panels={items} styled  >

					</Accordion>

					<div className="all-files-con">
						<div className="multiple-files-box expand">
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
