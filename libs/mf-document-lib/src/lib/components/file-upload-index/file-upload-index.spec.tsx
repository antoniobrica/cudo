import { render } from '@testing-library/react';

import FileUploadIndex from './file-upload-index';

describe('FileUploadIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileUploadIndex />);
    expect(baseElement).toBeTruthy();
  });
});
