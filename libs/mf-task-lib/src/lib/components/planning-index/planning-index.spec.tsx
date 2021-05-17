import { render } from '@testing-library/react';

import PlanningIndex from './planning-index';

describe('PlanningIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlanningIndex />);
    expect(baseElement).toBeTruthy();
  });
});
