import React from 'react';
import Leftmenu from './leftmenu';
import '../../../style/index.scss';
export default {
    title: 'LeftMenu',
    component: Leftmenu,
}

export const primaryLeftMenu = () => {
    /* eslint-disable-next-line */
    // const props: SharedComponentsProps = {};

    return <Leftmenu />;
};