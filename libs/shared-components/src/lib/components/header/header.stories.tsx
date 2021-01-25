import React from 'react';
import Header from './header';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
export default {
    title: 'Header',
    component: Header,
    decorators: [withKnobs],
}

export const primaryHeader = () => {
    /* eslint-disable-next-line */
    // const props: SharedComponentsProps = {};

    return <Header />;
};
