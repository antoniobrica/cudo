import { render } from '@testing-library/react';

import PinTaskList from './pin-task-list';

describe('PinTaskList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PinTaskList />);
    expect(baseElement).toBeTruthy();
  });
});
