import React from 'react';

import '../../../style/index.scss';
import { Tab } from 'semantic-ui-react'

import img4 from 'libs/shared-components/src/folder.png';
import img5 from 'libs/shared-components/src/image2.png';
import img6 from 'libs/shared-components/src/eyeview.png';
import img1 from 'libs/shared-components/src/powerpoint.png';
import img2 from 'libs/shared-components/src/pdf.png';
/* eslint-disable-next-line */
export interface FileStructureProps {
	files
}

export function FileStructure(props: FileStructureProps) {

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


					<div className="card1 card-custom gutter-b width_card">

						<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

							<div className="d-flex align-items-center py-2">
								<span> <img src={img1} className="  mr-10 " />  </span>

								<span className="font-weight-bold mb-0 mr-10">2320.313.3231_file_0364.pptx</span>
								<div className="d-flex mr-3">

									<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

										<div className="navi-item mr-2">
											<button className="ui mini button grey-btn">Ver 2</button>
										</div>

									</div>

								</div>

							</div>

							<div className="symbol-group symbol-hover py-2">
								<div className="symbol symbol-30">
									<a href="">  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
									<a href=""> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

									<span className="mr-2"  >...</span>
								</div>

							</div>

						</div>
					</div>
					 */}
					{props.files.map((file, i) => (
						<div className="card1 card-custom gutter-b width_card" key={i}> 

							<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

								<div className="d-flex align-items-center py-2">
									<span> <img src={img2} className="  mr-10 " />  </span>

									<span className="font-weight-bold mb-0 mr-10">{file.name}</span>
									<div className="d-flex mr-3">

										{/* <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

											<div className="navi-item mr-2">
												<a className="navi-link">
													<span className="navi-text">  <i className="ms-Icon ms-Icon--CommentPrevious" aria-hidden="true"></i> 2 comments  </span>
												</a>
											</div>




											<div className="navi-item mr-2">
												<a href="" className="navi-link">
													<span className="navi-text"><i className="ms-Icon ms-Icon--CheckboxComposite" aria-hidden="true"></i> 2 tasks </span>
												</a>
											</div>
										</div> */}

									</div>

								</div>

								<div className="symbol-group symbol-hover py-2">
									<div className="symbol symbol-30">

										<a href="">  <i className="ms-Icon ms-Icon--Download mr-10" aria-hidden="true"></i></a>
										<a href=""> <i className="ms-Icon ms-Icon--RedEye mr-10" aria-hidden="true"></i></a>

										<span className="mr-2"  >...</span>
									</div>

								</div>

							</div>
						</div>
					))}
				</div>

			</Tab.Pane>,
		},
		{
			menuItem: { key: 'Task', icon: 'print', content: 'Send to print' },
			render: () => <Tab.Pane attached={false}>  Task</Tab.Pane>,
		},

	]

	return (
		<div className=" navbar-collapse box-shadow ">


			<Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />

		</div>



	);
}

export default FileStructure;
