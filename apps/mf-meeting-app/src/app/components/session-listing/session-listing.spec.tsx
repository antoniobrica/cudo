import { render } from '@testing-library/react';

import SessionListing from './session-listing';

describe('SessionList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionListing />);
    expect(baseElement).toBeTruthy();
  });
});
