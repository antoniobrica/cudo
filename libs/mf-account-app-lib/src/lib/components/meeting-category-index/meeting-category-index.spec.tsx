import { render } from '@testing-library/react';

import MeetingCategoryIndex from './meeting-category-index';

describe('MeetingCategoryIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetingCategoryIndex />);
    expect(baseElement).toBeTruthy();
  });
});
