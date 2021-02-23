import React from 'react';
 
import '../../../style/index.scss';
import { Header, Icon, Image, Menu, Segment, Sidebar,Button,Popup } from 'semantic-ui-react'
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
      
      <Popup
      content='Add Project'
        
        trigger={<i className="ms-Icon ms-Icon--CirclePlus" aria-hidden="true"></i>}
        size='small' position='right center'
      />
    
      </Menu.Item>
      <Menu.Item as='a'>
      
      <Popup  
       
      
     
      content='Search'
      trigger={<i className="ms-Icon ms-Icon--Search" aria-hidden="true"></i>} size='small' position='right center'>
     
    </Popup>
      </Menu.Item>
      <Menu.Item as='a'>
     
        
      <Popup
       content=' '
      trigger={ <i className="ms-Icon ms-Icon--ViewDashboard" aria-hidden="true"></i>} size='small' position='right center'>
      
    </Popup>
      </Menu.Item>
      <Menu.Item as='a'>
      <Popup 
       content='Project'
      trigger={  <i className="ms-Icon ms-Icon--FabricNewFolder" aria-hidden="true"></i>
      } size='small' position='right center'>
      
      </Popup>
      
      </Menu.Item>
      <Menu.Item as='a'>
     
      <Popup 
      content='Calendar'
      trigger={  <i className="ms-Icon ms-Icon--CalendarAgenda" aria-hidden="true"></i>
      } size='small' position='right center'>
      
      </Popup>
       
      </Menu.Item>
      <Menu.Item as='a'>
      
      
      <Popup
      content='Notification'
      trigger={ <i className="ms-Icon ms-Icon--Ringer" aria-hidden="true"></i>
      } size='small' position='right center'>
      
      </Popup>
       
      </Menu.Item>
      <Menu.Item as='a'>
     
      <Popup 
      content='People'
      trigger={  <i className="ms-Icon ms-Icon--People" aria-hidden="true"></i>
      } size='small' position='right center'>
      
      </Popup>
      </Menu.Item>
      <Menu.Item as='a'>
     
      <Popup
      content='Message'
      trigger={  <i className="ms-Icon ms-Icon--FollowUser" aria-hidden="true"></i>
      } size='small' position='right center'>
      
      </Popup>
       
      </Menu.Item>
      <Menu.Item as='a'>
      
      
      <Popup
      content='Configuration'
      trigger={  <i className="ms-Icon ms-Icon--Settings" aria-hidden="true"></i>
      } size='small' position='right center'>
     
      </Popup>
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
