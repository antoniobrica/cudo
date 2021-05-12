import { render } from '@testing-library/react';

import AddFolder from './add-folder';

describe('AddFolder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddFolder />);
    expect(baseElement).toBeTruthy();
  });
});
