import React, {Component} from 'react';
 
import '../../../style/index.scss';
import {   Menu,  Sidebar, Accordion, Form } from 'semantic-ui-react'
const ColorForm = (
    <Form>
      <Form.Group grouped> 
      <Form.Checkbox label='Red' name='color' value='red' />
      </Form.Group>
    </Form>
  )
  
  const SizeForm = (
    <Form>
      <Form.Group grouped>
        <Form.Radio label='Small' name='size' type='radio' value='small' /> 
      </Form.Group>
    </Form>
  )
/* eslint-disable-next-line */
// export interface SideMenuProps { }

export default class AccordionExampleMenu extends Component {
    state = { activeIndex: 0 }
  
    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    }
  
    render() {
      const { activeIndex } = this.state
  
      return (
          <div id="side-menu">
             
<Accordion as={Menu} vertical>
<div>
<i aria-hidden="true" className="long arrow alternate left"></i>  <span className="preliminary-font">  Burj Khalifa</span>
                   <span className="summary float-right"><span className="dot">...</span></span>
                  </div>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 0}
              content='Everything'
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 0} content={SizeForm} />
          </Menu.Item>
  
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 1}
              content='Colors'
              index={1}
              onClick={this.handleClick}
            />
            <Accordion.Content active={activeIndex === 1} content={ColorForm} />
          </Menu.Item>
        </Accordion>

          </div>
        
      )
    }
  }

// export default AccordionExampleMenu;
