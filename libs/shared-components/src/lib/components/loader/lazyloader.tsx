import React from 'react';
import './../../../assets/style/index.scss'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
export function LazyLoading() {

  return (
    <div className="ui active centered inline loader">Loading</div>
  );
}

export default LazyLoading;
