import { render } from '@testing-library/react';

import ProjectWorktypes from './project-worktypes';

describe('ProjectWorktypes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectWorktypes />);
    expect(baseElement).toBeTruthy();
  });
});
