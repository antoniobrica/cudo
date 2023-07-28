import { render } from '@testing-library/react';

import SessionProtocolIndex from './session-protocol-index';

describe('SessionProtocolIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionProtocolIndex />);
    expect(baseElement).toBeTruthy();
  });
});
