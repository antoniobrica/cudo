import { render } from '@testing-library/react';

import MeetingCategory from './meeting-category';

describe('MeetingCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetingCategory />);
    expect(baseElement).toBeTruthy();
  });
});
