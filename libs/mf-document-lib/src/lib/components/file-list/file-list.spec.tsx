import { render } from '@testing-library/react';

import FileList from './file-list';

describe('FileList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileList />);
    expect(baseElement).toBeTruthy();
  });
});
