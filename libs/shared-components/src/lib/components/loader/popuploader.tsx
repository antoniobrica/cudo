import React from 'react';
import './../../../assets/style/index.scss'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
export interface popupLoadingProps{}
export function PopupLoading(props:popupLoadingProps) {

  return (
    <Dimmer active inverted Center inline>
      <Loader size='big'>Loading</Loader>
    </Dimmer>
  );
}

export default PopupLoading;
