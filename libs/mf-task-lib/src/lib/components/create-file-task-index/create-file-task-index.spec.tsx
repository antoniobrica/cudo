import { render } from '@testing-library/react';

import CreateFileTaskIndex from './create-file-task-index';

describe('CreateFileTaskIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateFileTaskIndex />);
    expect(baseElement).toBeTruthy();
  });
});
