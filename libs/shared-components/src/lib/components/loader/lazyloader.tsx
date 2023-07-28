import React from 'react';
import './../../../assets/style/index.scss'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
export interface lazyLoadingProps{}
export function LazyLoading(props: lazyLoadingProps) {

  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}

export default LazyLoading;
