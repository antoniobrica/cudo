import { render } from '@testing-library/react';

import Bkps from './bkps';

describe('Bkps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bkps />);
    expect(baseElement).toBeTruthy();
  });
});
