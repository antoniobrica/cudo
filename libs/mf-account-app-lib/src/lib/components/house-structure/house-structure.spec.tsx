import { render } from '@testing-library/react';

import HouseStructure from './house-structure';

describe('HouseStructure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HouseStructure />);
    expect(baseElement).toBeTruthy();
  });
});
