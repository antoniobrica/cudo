import { render } from '@testing-library/react';

import SessionDelete from './session-delete';

describe('SessionDelete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionDelete />);
    expect(baseElement).toBeTruthy();
  });
});
