import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react'
interface BtnProps {
  changeAdd
}

export function ToggleButton(props: BtnProps) {

  const options = [
    { key: 'add', icon: 'add', text: 'Task', value: 'add' },
    { key: 'file', icon: 'pin', text: 'Task from file', value: 'file' },
  ]
  const changeAdd = (e, data) => {
    console.log('data.value', data.value);
    props.changeAdd(data.value)

  }
  return (
    <div style={{ marginTop: '18px' }}>
      <Button.Group>

        <Button className="grey-btn"> + Add New</Button>
        <Dropdown style={{ backgroundColor: '#2d62ed' }}
          className='button icon'
          floating
          options={options}
          onChange={changeAdd}
        />
      </Button.Group>
    </div>

  )
}

export default ToggleButton
