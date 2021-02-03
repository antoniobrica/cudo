import React from 'react';
import Leftmenu from './leftmenu';
import '../../../style/index.scss';
export default {
    title: 'LeftMenu',
    component: Leftmenu,
}
import { storiesOf } from '@storybook/react';
import { Grid, Header, Segment, Form, Input } from 'semantic-ui-react';


storiesOf('components/colorscheme', module)
    .add('with Palette ', () => <Segment className="ui-kit">
        <Header as='h2' className="mt-1">Color Palette</Header>
        <div className="color-palette">

            <div className="column ">
                <div className="box grey-60-cl">
                    #ebebeb
                </div>
                <span>Grey 92</span>
            </div>

            <div className="column">
                <div className="box grey-mb">
                    #c0c0c0
                </div>
                <span>Company Silver</span>
            </div>

            <div className="column">
                <div className="box blue-mb white-text">
                    #0000cd
                </div>
                <span>Company Blue</span>
            </div>

            <div className="column">
                <div className="box yellow-mb white-text">
                    #CFB53B
                </div>
                <span>Company Gold Star, Favorite On</span>
            </div>

            <div className="column">
                <div className="box yellow-mb-3">
                    #f4f1d6
                </div>
                <span>Spotlight Course Label</span>
            </div>

            <div className="column">
                <div className="box green-mb white-text">
                    #32CD32
                </div>
                <span>Lime / Green Call, Buy</span>
            </div>

            <div className="column">
                <div className="box green-dark white-text">
                    #28A428
                </div>
                <span>Dark Lime</span>
            </div>

            <div className="column">
                <div className="box red-mb white-text">
                    #CC0000
                </div>
                <span>Red Error</span>
            </div>

            <div className="column">
                <div className="box white-smoke-mb">
                    #F5F5F5
                </div>
                <span>White Smoke</span>
            </div>

            <div className="column">
                <div className="box lavender-blue">
                    #CCCCFF
                </div>
                <span>Lavender Blue</span>
            </div>

            <div className="column">
                <div className="box black-mb white-text">
                    #232323
                </div>
                <span>Default Text Color</span>
            </div>

        </div>

    </Segment>
    )