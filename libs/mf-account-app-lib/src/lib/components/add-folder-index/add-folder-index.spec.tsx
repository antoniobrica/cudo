import { render } from '@testing-library/react';

import AddFolderIndex from './add-folder-index';

describe('AddFolderIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddFolderIndex />);
    expect(baseElement).toBeTruthy();
  });
});
