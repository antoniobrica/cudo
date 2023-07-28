import React, { useState, useEffect } from 'react';

import './project-info.module.scss';
import { GET_TODOS, GET_PROJECTS } from '../../graphql/graphql';
import { useTodoQuery, useProjectQuery } from '../../services/useRequest';
import { ITodo, IProject } from '../../interfaces/project';
import Modal from 'react-modal';
import { Card, Icon, Form, Grid, Button, Dropdown, Label } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoaderPage, LazyLoading, Menubar } from '@cudo/shared-components';
import ReactQuill, { Quill } from 'react-quill';
import Logo from '../../../assets/images/Shape 2.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';

import ModalExampleModal from '../modal/modal';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
// initI18n('./assets/i18n/en-GB.json', defaultLanguage);

/* eslint-disable-next-line */
export interface ProjectInfoProps {}

export function ProjectInfo(props: ProjectInfoProps) {
  const [activeErrorClass, setActiveErrorClass] = useState(false);

  const notify = () => toast('This is Warning Message');
  const referenceID = localStorage.getItem('selectedCompany') ?? 'CUDO';

  const { loading, error, data } = useQuery(GET_PROJECTS, { variables: { referenceID: 'CUDO' } });
  const [openForm, setopenForm] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [projectErrors, setProjectErrors] = useState('');
  const [menuExpand, setMenuExpand] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  // const dispatch = useDispatch()

  const openProject = (projectId) => {
    navigate(`/home/project/${projectId}`);
  };

  const refresh = (data) => {
    // console.log('refresh is called', data);
  };

  // set sucess value to toaster function
  const getTaskToasterMessage = (data) => {
    setActiveErrorClass(false);
    toast(data);
  };

  // set error value to task error for toaster function
  const getTaskErrorMessage = (data) => {
    setActiveErrorClass(true);

    let errorExeptionMessage: string;
    switch (data) {
      case 5001:
        errorExeptionMessage = t('toaster.error.project.project_already_exists'); // project already exists
        break;
      case 5002:
        errorExeptionMessage = t('toaster.error.project.project_not_found'); // not found
        break;
      case 5003:
        errorExeptionMessage = t('toaster.error.project.project_not_created'); // not added
        break;
      case 5004:
        errorExeptionMessage = t('toaster.error.project.no_name'); //empty name
        break;
      case 5005:
        errorExeptionMessage = t('toaster.error.project.no_number'); // np number
        break;
      case 5006:
        errorExeptionMessage = t('toaster.error.project.no_client'); // no client
        break;
      case 5007:
        errorExeptionMessage = t('toaster.error.project.no_building'); // no building type
        break;
      case 5008:
        errorExeptionMessage = t('toaster.error.project.wrong_date'); // not found project
        break;
      case 5009:
        errorExeptionMessage = t('toaster.error.planning.project_not_found'); // not ref
        break;
      case 5010:
        errorExeptionMessage = t('toaster.error.project.company_not_found'); // no company
        break;
      case 5011:
        errorExeptionMessage = t('toaster.error.project.building_not_found'); // no building
        break;
      case 500:
        errorExeptionMessage = t('toaster.error.project.internal_server_error');
        break;
      default:
        errorExeptionMessage = '';
    }
    setProjectErrors(errorExeptionMessage);
  };

  // set error message to toaster
  // React.useEffect(() => {
  //   if (projectErrors) {
  //     toast(projectErrors);
  //   }
  // }, [projectErrors]);

  const onClickMenuExpand = () => {
    setMenuExpand(!menuExpand);
  };

  const callbackFunction = (childData) => {
    switch (childData) {
      case 'logout':
        // logout();
        break;
      case 'project':
        // goToProjectDashboard();
        navigate('/home/project');
        break;
      default:
        break;
    }
  };

  if (loading) return <LazyLoading />;
  if (error)
    return (
      <div style={{ marginLeft: 900 }}>
        <ModalExampleModal
          onSuccess={refresh}
          getProjectToasterMessage={getTaskToasterMessage}
          getProjectErrorMessage={getTaskErrorMessage}
        ></ModalExampleModal>
      </div>
    );
  return (
    <div>
      <div className={menuExpand ? 'expand-main-menu' : 'collapsed-main-menu'}>
        <Menubar data={data} parentCallback={callbackFunction} mainMenuExpand={onClickMenuExpand} history={navigate} />
      </div>
      <ToastContainer
        className={`${activeErrorClass ? 'error' : 'success'}`}
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />

      <div className="app-content-body body_cards_area project-listing-page">
        <div className="dashboard-header">
          {/* <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer className="success" position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick pauseOnFocusLoss pauseOnHover />
          </div> */}
          <h3>
            {t('project_list.header.header_title')}{' '}
            <span className="total">
              {t('project_list.header.header_line.total')} {data.projects.length}{' '}
              {t('project_list.header.header_line.project_added')}
            </span>
          </h3>
          <ModalExampleModal
            onSuccess={refresh}
            getProjectToasterMessage={getTaskToasterMessage}
            getProjectErrorMessage={getTaskErrorMessage}
          ></ModalExampleModal>
        </div>

        <Form>
          <div className="project-listing-cards">
            <ul>
              {data?.projects?.map((project: IProject, i) => {
                const { projectId, projectName, client, buildingType, description, createdBy } = project;
                const shortDescription = description.length > 94 ? description.substring(0, 94) + '...' : description;
                return (
                  <li key={projectId}>
                    <div className="project-logo-action">
                      <div style={{ width: '40px', height: '44px' }} className="project-logo">
                        <img src={Logo} alt="Logo" />
                      </div>

                      <div className="project-action">
                        <div className="symbol symbol-30 d-flex">
                          <span className="dropdown-action">
                            <Dropdown icon="ellipsis horizontal" floating labeled>
                              <Dropdown.Menu className="dropdowncomplete">
                                <Dropdown.Item icon="setting" text={t('project_list.project_card.manage_project')} />
                                <Dropdown.Item icon="tasks" text={t('project_list.project_card.view_activity')} />
                                <Dropdown.Item icon="archive" text={t('project_list.project_card.archive')} />
                                <Dropdown.Item icon="trash alternate outline" text={t('common.delete')} />
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="project-name">
                      <h4 onClick={() => openProject(projectId)}>
                        {projectName ? projectName : 'NA'} <span>{client ? client : 'NA'}</span>
                      </h4>
                    </div>

                    <div className="project-info">
                      <p>
                        {t('project_list.add_new_project.building_type_lable')} <span>{buildingType}</span>
                      </p>
                      {/* <p>Level of building <span>3rd</span></p> */}
                    </div>

                    <div className="project-description">
                      <p>{shortDescription ? shortDescription : 'NA'}</p>
                      {/* <p><ReactQuill id="txtDescription" readOnly={true} value={description} modules={{ toolbar: null }} /></p> */}
                      {/* <div className="project-members">
                        <Label circular color="orange">AK</Label>
                        <Label circular color="violet">AM</Label>
                        <Label circular color="brown">VN</Label>
                      </div> */}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Form>
      </div>

      <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
        {/* {data.getProjects.map((project: IProject) => (
      <Project key={project.projectId} project={project} />
    ))} */}
      </div>
    </div>
  );
}

export default ProjectInfo;
