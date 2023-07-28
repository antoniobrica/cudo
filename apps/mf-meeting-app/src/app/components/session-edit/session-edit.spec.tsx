import { render } from '@testing-library/react';

import EditSession from './session-edit';

describe('EditSession', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditSession />);
    expect(baseElement).toBeTruthy();
  });
});
