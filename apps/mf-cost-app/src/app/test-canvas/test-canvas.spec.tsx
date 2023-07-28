import { render } from '@testing-library/react';

import TestCanvas from './test-canvas';

describe('TestCanvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestCanvas />);
    expect(baseElement).toBeTruthy();
  });
});
