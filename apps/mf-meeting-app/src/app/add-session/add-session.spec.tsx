import { render } from '@testing-library/react';

import AddSession from './add-session';

describe('AddSession', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddSession />);
    expect(baseElement).toBeTruthy();
  });
});
