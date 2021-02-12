import React from 'react';
 
import '../../../style/index.scss';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

/* eslint-disable-next-line */
export interface MenuProps {
  data: string,
  parentCallback
 }

export function Menubar(props: MenuProps) {

  const [visible, setVisible] = React.useState(false)
        
  const handleOpenProject =(item)=>{
    console.log('open project', props.data)
    props.parentCallback(item)
  }

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
      <Menu.Item as='a' onClick={()=>handleOpenProject('project')}>
        <Icon name='add' />
        
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('search')}>
        <Icon name='search' />
         
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('dashboard')}>
        <Icon name='dashboard' />
       
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('calender')}>
        <Icon name='calendar' />
       
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('notification')}>
        <Icon name='bell' />
       
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('user')}>
        <Icon name='user' />
       
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('users')}>
        <Icon name='users' />
       
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('setting')}>
        <Icon name='setting' />
       
      </Menu.Item>
      <Menu.Item as='a' onClick={()=>handleOpenProject('project')}>
        <Icon name='angle double left' />
       
      </Menu.Item>

    </Sidebar>

    
  </Sidebar.Pushable>
      </div>
   
    
 
  );
}

export default Menubar;
