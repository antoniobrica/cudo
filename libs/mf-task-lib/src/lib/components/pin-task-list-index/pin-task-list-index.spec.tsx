import { render } from '@testing-library/react';

import PinTaskListIndex from './pin-task-list-index';

describe('PinTaskListIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PinTaskListIndex />);
    expect(baseElement).toBeTruthy();
  });
});
