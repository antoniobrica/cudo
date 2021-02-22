import React from 'react';
 
import '../../../style/index.scss';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
 /* eslint-disable-next-line */
export interface MenuProps { }

export function Menubar(props: MenuProps) {

  const [visible, setVisible] = React.useState(false)
         

  return (
    

      <div id="sidebar">
      <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
      
    >
      <Menu.Item as='a'>
         <img src="" alt="logo"></img>
        
      </Menu.Item>
      <Menu.Item as='a'>
       
        <i className="ms-Icon ms-Icon--CirclePlus" aria-hidden="true"></i>
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--Search" aria-hidden="true"></i>
       
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--ViewDashboard" aria-hidden="true"></i>
        
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--FabricNewFolder" aria-hidden="true"></i>
       
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i>
      
       
      </Menu.Item>
      <Menu.Item as='a'>
      
      <i className="ms-Icon ms-Icon--Ringer" aria-hidden="true"></i>
      
       
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--People" aria-hidden="true"></i>
       
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--FollowUser" aria-hidden="true"></i>
      
       
      </Menu.Item>
      <Menu.Item as='a'>
      <i className="ms-Icon ms-Icon--Settings" aria-hidden="true"></i>
      
       
      </Menu.Item>
      
      <Menu.Item as='a'>
     
        <i className="ms-Icon ms-Icon--DoubleChevronRight" aria-hidden="true"></i>
       
      </Menu.Item>

    </Sidebar>

  
  </Sidebar.Pushable>
 

      </div>

  
 
  );
}

export default Menubar;
