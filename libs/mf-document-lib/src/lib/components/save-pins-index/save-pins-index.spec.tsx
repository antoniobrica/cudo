import { render } from '@testing-library/react';

import SavePinsIndex from './save-pins-index';

describe('SavePinsIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SavePinsIndex />);
    expect(baseElement).toBeTruthy();
  });
});
