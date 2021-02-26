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

          
        <div className="sidebar-wrapper sidebar-theme">
            
        <nav id=" ">
            <div className="shadow-bottom"></div>
            <ul className="list-unstyled menu-categories ps ps--active-y" id="accordionExample">
                <li className="menu">
                    <a href=" " data-active="true" data-toggle="collapse" aria-expanded="true" className="dropdown-toggle">
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <span>Dashboard</span>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </a>
                    <ul className="submenu list-unstyled collapse show" id="dashboard" data-parent="#accordionExample"  >
                        <li className="active">
                            <a href="index.html"> Sales </a>
                        </li>
                        <li>
                            <a href="index2.html"> Analytics </a>
                        </li>
                    </ul>
                </li>

             
               
            </ul>
            
            
        </nav>

    </div>





//           <div id="side-menu">
             
// <Accordion as={Menu} vertical>
// <div>
// <i aria-hidden="true" className="long arrow alternate left"></i>  <span className="preliminary-font">  Burj Khalifa</span>
//                    <span className="summary float-right"><span className="dot">...</span></span>
//                   </div>
//           <Menu.Item>
//             <Accordion.Title
//               active={activeIndex === 0}
//               content='Everything'
//               index={0}
//               onClick={this.handleClick}
//             />
//             <Accordion.Content active={activeIndex === 0} content={SizeForm} />
//           </Menu.Item>
  
//           <Menu.Item>
//             <Accordion.Title
//               active={activeIndex === 1}
//               content='Colors'
//               index={1}
//               onClick={this.handleClick}
//             />
//             <Accordion.Content active={activeIndex === 1} content={ColorForm} />
//           </Menu.Item>
//         </Accordion>

//           </div>
        
      )
    }
  }

// export default AccordionExampleMenu;
