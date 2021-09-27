import { render } from '@testing-library/react';

import PinCompletedTaskListIndex from './pin-completed-task-list-index';

describe('PinCompletedTaskListIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PinCompletedTaskListIndex />);
    expect(baseElement).toBeTruthy();
  });
});
