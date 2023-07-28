import { render } from '@testing-library/react';

import MfProjectLib from './mf-project-lib';

describe('MfProjectLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfProjectLib />);
    expect(baseElement).toBeTruthy();
  });
});
