import React from 'react';

import '../../../style/index.scss';
import { Segment, Dropdown, Input, Grid, Form } from 'semantic-ui-react'
import img from 'libs/shared-components/src/user.png';
import img2 from 'libs/shared-components/src/user2.png';
import img3 from 'libs/shared-components/src/green_tick.png';
import img4 from 'libs/shared-components/src/dots.png';
import img5 from 'libs/shared-components/src/tasks.png';
import { initI18n } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('./assets/i18n/{{lng}}.json', defaultLanguage);

export interface Tasks {
	task?,
	id?,
	updateTask?,
	veiwTask?,
	deleteTask?,
	editTask?
}
export function TaskArea(props: Tasks) {
	const { t, i18n } = useTranslation();
	const description = [
		<Segment>Pellentesque habitant morbi tristique senectus.</Segment>

	]
	const updateStatus = (task, id) => {
		props.updateTask(task, id)
	}
	const deleteTaskbyId = (task, id) => {
		props.deleteTask(task, id)
	}
	const veiwTaskbyId = (task, id) => {
		props.veiwTask(task, id)
	}
	const editTaskbyId = (task, id) => {
		props.editTask(task, id)
	}
	return (
		<div>

			{props.task.status === "COMPLETED" ?
				<div className="card1 card-custom gutter-b card-complete">

					<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

						<div className="d-flex align-items-center  py-2">
							<span> <img src={img4} className="  mr-10 " />  </span>
							<span className="textt">T-0{props.id + 1}</span>
							<span onClick={() => updateStatus(props.task, props.id)} className="anchor_complete">  <img src={img3} className=" mr-2 mr-10 " />   </span>
							<span className="font-weight-bold mb-0 mr-10 line-through">{props.task.taskTitle}</span>
							<div className="d-flex mr-3">

								<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

									<div className="navi-item mr-2">
										<a className="navi-link">
											<span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>2 files  -  </span>
										</a>
									</div>

									<div className="navi-item mr-2">
										<a href="" className="navi-link">
											<span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> 5 days  - </span>
										</a>
									</div>

									<div className="navi-item mr-2">
										<a className="navi-link">
											<span className="navi-text">Tender  -  </span>
										</a>
									</div>

									<div className="navi-item mr-2">
										<a href="" className="navi-link">
											<span className="navi-text">Paint Work  </span>
										</a>
									</div>
								</div>

							</div>

						</div>

						<div className="symbol-group symbol-hover py-2">
							<div className="symbol symbol-30">

								<img src={img2} />
								<span className="mr-2"  >

									<Dropdown text='...'>
										<Dropdown.Menu>

											<Dropdown.Item onClick={() => veiwTaskbyId(props.task, props.id)} icon='eye' text='View detail' />
											<Dropdown.Item onClick={() => editTaskbyId(props.task, props.id)} icon='pencil' text='Edit' />
											<Dropdown.Item onClick={() => updateStatus(props.task, props.id)} icon='check circle outline' text='Re-open' />
											<Dropdown.Item onClick={() => deleteTaskbyId(props.task, props.id)} icon='trash alternate outline' text='Delete' />
										</Dropdown.Menu>
									</Dropdown>
								</span>
							</div>

						</div>

					</div>
				</div>
				:

				<div className="card1 card-custom gutter-b">

					<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

						<div className="d-flex align-items-center py-2">
							<span> <img src={img4} className="  mr-10 " />  </span>
							<span className="textt">T-0{props.id + 1}</span>
							<span onClick={() => updateStatus(props.task, props.id)}><span className="anchor_complete"><a title="Mark as complete"> <span className="material-icons mr-2 mr-10 check-grey">check_circle_outline</span> </a> </span></span>
							<span className="font-weight-bold mb-0 mr-10">{props.task.taskTitle}</span>
							<div className="d-flex mr-3">

								<div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">

									<div className="navi-item mr-2">
										<a href=" " className="navi-link active">
											<span className="navi-text">( {props.task.startDate} ↦ Due {props.task.endDate})</span>
										</a>
									</div>

									<div className="navi-item mr-2">
										<a className="navi-link">
											<span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i>2 files  - </span>
										</a>
									</div>

									<div className="navi-item mr-2">
										<a href="" className="navi-link">
											<span className="navi-text"> <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i> {props.task.estimatedDays} Days- </span>
										</a>
									</div>
									<div className="navi-item mr-2">
										<a href="" className="navi-link">
											<span className="navi-text">Preliminary Studies  - </span>
										</a>
									</div>
									<div className="navi-item mr-2">
										<a href="" className="navi-link">
											<span className="navi-text">HVAC Work  </span>
										</a>
									</div>
								</div>

							</div>

						</div>

						<div className="symbol-group symbol-hover py-2">
							<div className="symbol symbol-30">
								{/* <img src={img} /> */}
								<span className="mr-2"  >

									<Dropdown text='...'>
										<Dropdown.Menu className="dropdowncomplete">
											<Dropdown.Item onClick={() => veiwTaskbyId(props.task, props.id)} icon='eye' text='View detail' />
											<Dropdown.Item onClick={() => editTaskbyId(props.task, props.id)} icon='pencil' text='Edit' />
											<Dropdown.Item onClick={() => updateStatus(props.task, props.id)} icon='check circle outline' text='Mark as complete' />
											<Dropdown.Item onClick={() => deleteTaskbyId(props.task, props.id)} icon='trash alternate outline' text='Delete' />
										</Dropdown.Menu>
									</Dropdown>
								</span>
							</div>

						</div>

					</div>
				</div>
			}

		</div>
	);
}

export default TaskArea;
