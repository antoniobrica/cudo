import React from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react'
interface BtnProps {
  changeAdd?
}

export function ToggleButton(props: BtnProps) {

  // const options = [
  //   { key: 'add', icon: 'add', text: 'Task', value: 'add' },
  //   { key: 'file', icon: 'pin', text: 'Task from file', value: 'file' },
  // ]
  const changeAdd = (e, data) => {
    console.log('data.value', data.value);
    props.changeAdd(data.value)

  }
  return (
    <div className="add-task-dropdown">
      {/* <img src="assets/images/plus_white.png" style={{ position: 'relative', top: '4px', marginRight: '-22px' }} />
      <Button.Group>

        <Button className="grey-btn"> <span style={{ fontSize: '14px', marginLeft: '11px' }}> Add New</span>  </Button>
        <Dropdown style={{ backgroundColor: '#2d62ed', marginLeft: '-10px' }}
          className='button icon'
          floating
          options={options}
          onChange={changeAdd}
          trigger={<></>}
        />
      </Button.Group> */}


  <Dropdown
      text='Add New'
      icon='add'
      floating
      labeled
      button
      onChange={changeAdd}
      className='icon'
    >
      <Dropdown.Menu>
        <Dropdown.Item>
          <Icon name='add' className='left floated' />
          Important
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name='pin' className='left floated' />
          Announcement
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </div>

  )
}

export default ToggleButton
