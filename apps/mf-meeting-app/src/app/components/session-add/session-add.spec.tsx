import { render } from '@testing-library/react';

import AddSession from './session-add';

describe('AddSession', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddSession />);
    expect(baseElement).toBeTruthy();
  });
});
