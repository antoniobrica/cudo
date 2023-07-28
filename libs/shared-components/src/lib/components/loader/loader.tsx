import React from 'react';
import '../../../assets/style/index.scss';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
export function LoaderPage() {

  return (
    <div>
      <Segment>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
    </div>
  );
}

export default LoaderPage;
