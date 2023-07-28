import { render } from '@testing-library/react';

import FileListIndex from './file-list-index';

describe('FileListIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileListIndex />);
    expect(baseElement).toBeTruthy();
  });
});
