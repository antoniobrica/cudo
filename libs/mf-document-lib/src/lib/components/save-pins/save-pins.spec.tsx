import { render } from '@testing-library/react';

import SavePins from './save-pins';

describe('SavePins', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SavePins />);
    expect(baseElement).toBeTruthy();
  });
});
