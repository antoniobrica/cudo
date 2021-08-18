import React from 'react';
import './../../../assets/style/index.scss'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
export function LazyLoading() {

  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}

export default LazyLoading;
