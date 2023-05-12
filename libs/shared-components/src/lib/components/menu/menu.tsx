import React, { useEffect } from 'react';

import './../../../assets/style/index.scss';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button, Popup, Dropdown } from 'semantic-ui-react';
import { NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import company from 'libs/shared-components/src/company2.png';
import userProfile from 'libs/shared-components/src/user_profile.png';

/* eslint-disable-next-line */
export interface MenuProps {
  parentCallback?;
  data?;
  mainMenuExpand?;
  history?;
  logoutUrl?;
  username?;
}

const profileOption = [
  {
    key: 'User Profile',
    text: 'User Profile',
    value: 'User Profile',
    icon: 'trophy',
    // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Logout',
    text: 'Logout',
    value: 'Logout',
    icon: 'trophy',
    // image: { avatar: true, src: `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online2.png` },
  },
];

const addNew = [
  {
    key: 'Project',
    text: 'Project',
    value: 'Project',
    icon: 'trophy',
    // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Task',
    text: 'Task',
    value: 'Task',
    icon: 'trophy',
    // image: { avatar: true, src: `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online2.png` },
  },
  {
    key: 'Milestone',
    text: 'Milestone',
    value: 'Milestone',
    icon: 'trophy',
    // image: { avatar: true, src: `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online2.png` },
  },
  {
    key: 'Tender',
    text: 'Tender',
    value: 'Tender',
    icon: 'trophy',
    // image: { avatar: true, src: `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/online2.png` },
  },
];

export function Menubar(props: MenuProps) {
  const location = useLocation();

  const match = useMatch('*');

  // const { url, path } = useRouteMatch();
  const url = location.pathname;
  const [visible, setVisible] = React.useState('');
  // const history = useHistory()

  // useEffect(() => {
  //   if (props?.historyPath?.includes('/home/project/')) {
  //     handleOpenProject('project')
  //   }
  // }, [props?.historyPath])
  const { t } = useTranslation();

  const handleOpenProject = (item) => {
    props?.parentCallback(item);
    setVisible(item);
    // props.history.push(`/home/${item}`)
  };

  const showHideMenu = () => {
    props?.mainMenuExpand(!props?.mainMenuExpand);
  };

  return (
    <div id="sidebar">
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible width="thin">
          <div className="sidebar-top-menu">
            <Menu.Item as="a" className="app-logo-sidebar">
              <img src={company} />
              <span>{t('menu.title')}</span>
            </Menu.Item>

            <Menu.Item as="a" className="menu-dropdown-sidebar profile-dropdown-menu">
              <div className="profile-img-main-menu">
                <img src={userProfile} />
              </div>

              <Dropdown text="John Smith" floating labeled>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <i className="ms-Icon ms-Icon--PlayerSettings" aria-hidden="true"></i>{' '}
                    {t('menu.profile.user_profile')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenProject('logout')}>
                    <i className="ms-Icon ms-Icon--PowerButton" aria-hidden="true"></i> {t('menu.logout')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>

            {/* <Menu.Item as='a' className="menu-dropdown-sidebar profile-dropdown-menu">
              <div className="profile-img-main-menu">
                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user_profile.png`} />
              </div>
              <span>John Smith</span>
              
              <ul>
                <li>
                  <i className="ms-Icon ms-Icon--PlayerSettings" aria-hidden="true"></i> User Profile
                </li>
                <li>
                  <i className="ms-Icon ms-Icon--PowerButton" aria-hidden="true"></i> Logout
                </li>
              </ul>
            </Menu.Item> */}

            <Menu.Item as="a" className="menu-dropdown-sidebar add-new-menu">
              <i className="ms-Icon ms-Icon--CirclePlus" aria-hidden="true"></i>

              <Dropdown text={t('common.add_new_button')} floating labeled>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <i className="ms-Icon ms-Icon--NewTeamProject" aria-hidden="true"></i> {t('menu.project')}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="ms-Icon ms-Icon--AddNotes" aria-hidden="true"></i> {t('project_tab_menu.task.title')}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="ms-Icon ms-Icon--IconSetsFlag" aria-hidden="true"></i> {t('menu.milestone')}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="ms-Icon ms-Icon--DecisionSolid" aria-hidden="true"></i>{' '}
                    {t('project_tab_menu.tender.title')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <span>Add new</span> */}
              {/* <ul>
                <li>
                  <i className="ms-Icon ms-Icon--NewTeamProject" aria-hidden="true"></i> Project
                </li>
                <li>
                  <i className="ms-Icon ms-Icon--AddNotes" aria-hidden="true"></i> Task
                </li>
                <li>
                  <i className="ms-Icon ms-Icon--IconSetsFlag" aria-hidden="true"></i> Milestone
                </li>
                <li>
                  <i className="ms-Icon ms-Icon--DecisionSolid" aria-hidden="true"></i> Tender
                </li>
              </ul> */}
            </Menu.Item>

            <Menu.Item as="a" onClick={() => handleOpenProject('search')}>
              <i className="ms-Icon ms-Icon--Search" aria-hidden="true"></i>
              {/* <Popup
                content='Search'
                trigger={<i className="ms-Icon ms-Icon--Search" aria-hidden="true"></i>} size='small' position='right center'>
              </Popup> */}
              <span>{t('common.search')}</span>
            </Menu.Item>

            <Menu.Item as="a" onClick={() => handleOpenProject('dashboard')}>
              <i className="ms-Icon ms-Icon--ViewDashboard" aria-hidden="true"></i>
              {/* <Popup
                content='Dashboard'
                trigger={<i className="ms-Icon ms-Icon--ViewDashboard" aria-hidden="true"></i>} size='small' position='right center'>
              </Popup> */}
              <span>{t('menu.dashboard')}</span>
            </Menu.Item>

            {/* <Menu.Item as={NavLink} to={`${url}/project`} */}
            <Menu.Item
              as="a"
              name="project"
              active={visible === 'project'}
              onClick={() => handleOpenProject('project')}
            >
              <i className="ms-Icon ms-Icon--NewTeamProject" aria-hidden="true"></i>
              {/* <Popup
                content='Project'
                trigger={<i className="ms-Icon ms-Icon--NewTeamProject" aria-hidden="true"></i>
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('menu.projects')}</span>
            </Menu.Item>

            <Menu.Item as="a" onClick={() => handleOpenProject('calendar')}>
              <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i>
              {/* <Popup
                content='Calendar'
                trigger={<i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i>
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('menu.calendar')}</span>
            </Menu.Item>

            <Menu.Item as="a" onClick={() => handleOpenProject('Notification')}>
              <i className="ms-Icon ms-Icon--Ringer" aria-hidden="true"></i>
              {/* <Popup
                content='Notification'
                trigger={<i className="ms-Icon ms-Icon--Ringer" aria-hidden="true"></i>
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('menu.notification')}</span>
            </Menu.Item>

            <Menu.Item as="a" onClick={() => handleOpenProject('people')}>
              <i className="ms-Icon ms-Icon--People" aria-hidden="true"></i>
              {/* <Popup
                content='People'
                trigger={<i className="ms-Icon ms-Icon--People" aria-hidden="true"></i>
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('project_list.add_new_project.people')}</span>
            </Menu.Item>

            <Menu.Item as="a" onClick={() => handleOpenProject('message')}>
              <i className="ms-Icon ms-Icon--ChatInviteFriend" aria-hidden="true"></i>
              {/* <Popup
                content='Message'
                trigger={<i className="ms-Icon ms-Icon--ChatInviteFriend" aria-hidden="true"></i>
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('project_tab_menu.messages.title')}</span>
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              to={`${url}/profile`}
              name="profile"
              active={visible === 'profile'}
              onClick={() => handleOpenProject('profile')}
            >
              <i className="ms-Icon ms-Icon--People" aria-hidden="true"></i>
              {/* <Popup
                content='profile'
                trigger={
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('menu.profile.title')}</span>
            </Menu.Item>
          </div>

          <div className="sidebar-bottom-menu">
            <Menu.Item as="a" onClick={() => handleOpenProject('Notification')}>
              <i className="ms-Icon ms-Icon--Settings" aria-hidden="true"></i>
              {/* <Popup
                content='Configuration'
                trigger={<i className="ms-Icon ms-Icon--Settings" aria-hidden="true"></i>
              } size='small' position='right center'>
              </Popup> */}
              <span>{t('menu.configuration')}</span>
            </Menu.Item>
            {/* <Menu.Item as='a' onClick={() => handleOpenProject('logout')}> */}
            {/* <Popup
                content='Logout'
                trigger={<i className="ms-Icon ms-Icon--SignOut" aria-hidden="true"></i>
                } size='small' position='right center'>
              </Popup> */}

            {/* <Menu.Item as='a' onClick={() => handleOpenProject('logout')}>L</Menu.Item> */}

            {/* <Menu.Item as='a' onClick={() => handleOpenProject('project')}> */}
            <Menu.Item as="a" onClick={showHideMenu} className="logout-menu">
              <i className="ms-Icon ms-Icon--DoubleChevronRight expand-sidebar-icon" aria-hidden="true"></i>
            </Menu.Item>
          </div>
        </Sidebar>
      </Sidebar.Pushable>
    </div>
  );
}

export default Menubar;
