import { render } from '@testing-library/react';

import CreateFileTask from './create-file-task';

describe('CreateFileTask', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateFileTask />);
    expect(baseElement).toBeTruthy();
  });
});
