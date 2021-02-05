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
        <Icon name='add' />
        
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='search' />
         
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='dashboard' />
       
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='calendar' />
       
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='bell' />
       
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='user' />
       
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='users' />
       
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='setting' />
       
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='angle double left' />
       
      </Menu.Item>

    </Sidebar>

    
  </Sidebar.Pushable>
      </div>
   
    
 
  );
}

export default Menubar;
