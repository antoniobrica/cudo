import React from 'react';

import '../../../style/index.scss';


/* eslint-disable-next-line */
export interface LeftmenuProps { }

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}


export function Leftmenu(props: LeftmenuProps) {

    return (


        <div className="wrapper">

            <nav id="sidebar">

                <div className="sidebar-header">
                    <img src="../../../stories/assets/Shape 2.svg"></img>    <h3>PM Tool</h3>

                </div>

                <ul className="list-unstyled components">

                    <li>
                        <a href="#" onClick={() => console.log('add new project')}>
                            <span className="material-icons">add_circle_outline</span>
                    Add New
                </a>

                    </li>
                    <li>
                        <a href="#">
                            <span className="material-icons">search</span>
                    Search
                </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-icons">dashboard</span>
                    Dashboard
                </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-icons">event_note</span>
                    Calendar
                </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-icons">notifications</span>
                    Notification
                </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-icons">people_outline</span>
                    People
                </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-icons">mark_email_unread</span>
                    Message
                </a>
                    </li>

                    <li className="configuration">
                        <a href="#">
                            <span className="material-icons">settings</span>
                    Configuration
                </a>

                    </li>
                    <li>
                        <a href="#">
                            <img src="https://react.semantic-ui.com/images/wireframe/square-image.png" className="ui medium circular image" />
                    John Smith
                </a>
                    </li>

                </ul>

                <ul className="list-unstyled">
                    <li>


                        <a href=''><span className="material-icons right-area">navigate_before</span> <span className="material-icons right-area">navigate_before</span></a>

                    </li>

                </ul>
            </nav>




            <nav id="aside">
                <div className="aside-header">

                    <h3> <span className="material-icons large">keyboard_backspace</span>Burj Khalifa
         <span className="summary"><span className="dot">...</span>

                        </span>
                    </h3>

                    <sub>John&Co.</sub>
                </div>

                <ul className="list-unstyled components">

                    <li>
                        <a href="#">
                            Everything
                </a>

                    </li>
                    <li>
                        <a href="#">

                            Electrical Work
                </a>
                    </li>
                    <li>
                        <a href="#">

                            Dashboard
                </a>
                    </li>
                    <li>
                        <a href="#">

                            HAVC Work
                </a>
                    </li>
                    <li>
                        <a href="#">

                            Internet wire fitting
                </a>
                    </li>
                    <li>
                        <a href="#">

                            People
                </a>
                    </li>
                    <li>
                        <a href="#">

                            Paint Work
                </a>
                    </li>
                    <li>
                        <a href="#">

                            Water storage plant
                </a>
                    </li>

                </ul>

            </nav>

        </div>



    );
}

export default Leftmenu;
