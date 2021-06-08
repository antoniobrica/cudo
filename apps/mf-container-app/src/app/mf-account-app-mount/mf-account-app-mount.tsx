import React, { Component } from 'react';

import './mf-account-app-mount.module.scss';

/* eslint-disable-next-line */
export interface MfAccountAppMountProps { }

const loadDynamicScript = (callback) => {
  const existingScript = document.getElementById('scriptId');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'http://192.168.29.131:6001/main.js'; // URL for the third-party library being loaded.
    script.id = 'scriptId'; // e.g., googleMaps or stripe
    // script.setAttribute('crossOrigin', '*');
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};


export class MfAccountAppMount extends Component<MfAccountAppMountProps> {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadDynamicScript(() => {
      (window as { [key: string]: any })["mfProducts"]("todo");
    });
  }
  render() {
    return (
      <div id="todo" />
    );
  }
}

export default MfAccountAppMount;
