import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react'


export function ToggleButton() {

  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  ]
  const changeAdd = (data) => {
    console.log('data.value', data.value);
  }
  return (
    <div>
      <Button.Group>

        <Button className="grey-btn">Save</Button>
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
