import { render } from '@testing-library/react';

import { PinCompletedTaskList } from './pin-completed-task-list';

describe('PinCompletedTaskList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PinCompletedTaskList />);
    expect(baseElement).toBeTruthy();
  });
});
