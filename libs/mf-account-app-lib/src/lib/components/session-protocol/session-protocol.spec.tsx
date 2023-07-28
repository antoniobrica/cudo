import { render } from '@testing-library/react';

import SessionProtocol from './session-protocol';

describe('SessionProtocol', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionProtocol />);
    expect(baseElement).toBeTruthy();
  });
});
