import { render } from '@testing-library/react';

import BkpsIndex from './bkps-index';

describe('BkpsIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BkpsIndex />);
    expect(baseElement).toBeTruthy();
  });
});
