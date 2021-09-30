import { render } from '@testing-library/react';

import CommentAdd from './comment-add';

describe('CommentAdd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentAdd />);
    expect(baseElement).toBeTruthy();
  });
});
