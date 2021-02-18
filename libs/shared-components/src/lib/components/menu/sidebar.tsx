import React, {Component} from 'react';
 
import '../../../style/index.scss';
import {   Icon,  Sidebar, Accordion, Form } from 'semantic-ui-react'
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

          
        <div className="sidebar-wrapper sidebar-theme">
            <Accordion className="ui-accordion">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
          className="active-title"
        >
         
         Everything <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content  active={activeIndex === 0}>
          <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
          className="active-title"
        > 
          Electrical Work (1/5) <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 1}>
        <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
          className="active-title"
        >
          
         HVAC Work <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 2}>
        <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
          className="active-title"
        >
          
         Internet wire fitting   <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 3}>
        <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
        </Accordion.Content>
        
        <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={this.handleClick}
          className="active-title"
        >
           
         Paint Work  <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 4}>
        <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
        </Accordion.Content>
        
        <Accordion.Title
          active={activeIndex === 5}
          index={5}
          onClick={this.handleClick}
          className="active-title"
        >
          
         Paint Work  <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 5}>
        <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
        </Accordion.Content>
        
        <Accordion.Title
          active={activeIndex === 6}
          index={6}
          onClick={this.handleClick}
          className="active-title"
        >
         
         Water storage plant    <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 6}>
        <ul>
          <li>Strategic Planning </li>
          <li>Preliminary Studies</li>
          <li>Project Planning</li>
          <li>Tender</li>
          <li>Realization</li>
          </ul>
         
        </Accordion.Content>
      </Accordion>

    </div>




 
        
      )
    }
  }

// export default AccordionExampleMenu;
