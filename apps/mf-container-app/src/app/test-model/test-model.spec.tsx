import { render } from '@testing-library/react';

import TestModel from './test-model';

describe('TestModel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestModel />);
    expect(baseElement).toBeTruthy();
  });
});
