import React from 'react';

import '../../../style/index.scss';
import { Tab, Accordion } from 'semantic-ui-react'

import img4 from 'libs/shared-components/src/folder.png';
import img5 from 'libs/shared-components/src/image2.png';
import img6 from 'libs/shared-components/src/eyeview.png';
import img1 from 'libs/shared-components/src/powerpoint.png';
import img2 from 'libs/shared-components/src/pdf.png';
import ViewFileDetail from '../modal/viewdetailsfile';
/* eslint-disable-next-line */
export interface FileStructureProps {
	files?,
	downloadFiles,
	downloadedImg,
	viewFiles
}

export function FileStructure(props: FileStructureProps) {
	const [view, setView] = React.useState(false);
	const [expand, setExpand] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [filesData, setFilesData] = React.useState<any>();  // todo: add types for this
	const [items, setItems] = React.useState([]);
	const [imgUrl, setimgUrl] = React.useState('');
	const [fname, setFname] = React.useState('');
	const [fType, setFtype] = React.useState('');



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
				if (props.downloadedImg[i].filename == filesData.fileTitle) {
					setimgUrl(props.downloadedImg[i].url);
				}
			}

		}
	})
	React.useEffect(() => {
		if (props.files) {
			setItems(props.files.map((file, i) => ({ key: i, title: file.isFolder ? file.folderName : file.BKPIDTitle, content: { content: (renderItems(file.files)) } })));
		}
	}, [props.files]);
	const renderItems = (data) => {
		const files = data.map((file) => {
			return (
				<div className="card1 card-custom gutter-b width_card">

					<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

						<div className="d-flex align-items-center py-2">
							<span>
								{file.fileType == ("image/jpeg" || "image/png")
									?
									<img src={img5} className="  mr-10 " /> :
									<img src={img2} className="  mr-10 " />
								}

							</span>

							<span className="font-weight-bold mb-0 mr-10">{file.fileTitle}</span>
							{/* <div className="d-flex mr-3">

								<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

									<div className="navi-item mr-2">
										<button className="ui mini button grey-btn">{file.fileVersion}</button>
									</div>

								</div>

							</div> */}

						</div>

						<div className="symbol-group symbol-hover py-2">
							<div className="symbol symbol-30">
								<a onClick={() => download(file.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
								<a onClick={() => viewFile(file)}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

								<span className="mr-2"  >...</span>
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
			menuItem: { key: 'Overview', icon: 'images', content: 'All files' },
			render: () => <Tab.Pane attached={false}>
				<div className="ui-tabs">
					{/* <div className="card1 card-custom gutter-b width_card">

						<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

							<div className="d-flex align-items-center py-2">
								<span> <img src={img4} className="  mr-10 " />  </span>

								<span className="font-weight-bold mb-0 mr-10">Information Data</span>
								<div className="d-flex mr-3">

									<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

										<div className="navi-item mr-2">
											<a href=" " className="navi-link active">
												<span className="navi-text">( 5 files )</span>
											</a>
										</div>

									</div>

								</div>

							</div>

							<div className="symbol-group symbol-hover py-2">
								<div className="symbol symbol-30">

									<span className="mr-2"  >...</span>
								</div>

							</div>

						</div>
					</div>


					<div className="card1 card-custom gutter-b width_card">

						<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

							<div className="d-flex align-items-center py-2">
								<span> <img src={img5} className="  mr-10 " />  </span>

								<span className="font-weight-bold mb-0 mr-10">1542.313.3231_project_plan_0358.cad</span>
								<div className="d-flex mr-3">

									<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

										<div className="navi-item mr-2">
											<a href=" " className="navi-link active">
												<span className="navi-text">( 5 files )</span>
											</a>
										</div>

									</div>

								</div>

							</div>

							<div className="symbol-group symbol-hover py-2">
								<div className="symbol symbol-30">
									<a href=""><img src={img6} className="  mr-10 " /> </a>
									<a href="">  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
									<a href=""> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

									<span className="mr-2"  >...</span>
								</div>

							</div>

						</div>
					</div>

	 */}

					{/* 
					{(props.files || []).map((file, i) => (
						//  file.isFolder? 
						<div className="card1 card-custom gutter-b width_card" key={i} onClick={() => expandFolder(file.files)}>

							<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

								<div className="d-flex align-items-center py-2">
									<span> <img src={img4} className="  mr-10 " />  </span>

									<span className="font-weight-bold mb-0 mr-10">{file.isFolder ? file.folderName : file.BKPIDTitle}</span>
									<div className="d-flex mr-3">

										<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

											<div className="navi-item mr-2">
												<a href=" " className="navi-link active">
													<span className="navi-text">( {file?.files?.length} files )</span>
												</a>
											</div>

										</div>

									</div>

								</div>

								<div className="symbol-group symbol-hover py-2">
									<div className="symbol symbol-30">

										<span className="mr-2"  >...</span>
									</div>

								</div>

							</div>
						</div>	
					))} */}
				</div>
				{/* {expand ?
					filesData.map((file) => {
						return (
							<div className="card1 card-custom gutter-b width_card">

								<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

									<div className="d-flex align-items-center py-2">
										<span> 
											{file.fileType == ("image/jpeg" || "image/png")
											?
											<img src={img5} className="  mr-10 " /> :
											<img src={img2} className="  mr-10 " /> 
										}
										
										 </span>

										<span className="font-weight-bold mb-0 mr-10">{file.fileTitle}</span>
										<div className="d-flex mr-3">

											<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

												<div className="navi-item mr-2">
													<button className="ui mini button grey-btn">{file.fileVersion}</button>
												</div>

											</div>

										</div>

									</div>

									<div className="symbol-group symbol-hover py-2">
										<div className="symbol symbol-30">
											<a onClick={()=>download(file.fileTitle)}>  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
											<a onClick={viewFile}> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

											<span className="mr-2"  >...</span>
										</div>

									</div>

								</div>
							</div>
						)
					})

					: null} */}
				<div className="ui card " style={{ width: '80%' }}>
					<Accordion className="widtharea" defaultActiveIndex={0} panels={items} styled  >


					</Accordion>



				</div>
			</Tab.Pane>,
		},
		{
			menuItem: { key: 'Task', icon: 'print', content: 'Send to print' },
			render: () => <Tab.Pane attached={false}>  Task</Tab.Pane>,
		},

	]

	return (
		<div className=" navbar-collapse box-shadow " style={{ marginTop: '-63px' }}>
			{view && imgUrl.length > 0 ?
				<div>
					<ViewFileDetail open={view} fType={fType} filesData={filesData} dowloadFilesData={props.downloadedImg} ></ViewFileDetail>
				</div> : null}

			<Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
		</div>



	);
}

export default FileStructure;
