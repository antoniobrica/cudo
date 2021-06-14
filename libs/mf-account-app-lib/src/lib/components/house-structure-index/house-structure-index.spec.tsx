import { render } from '@testing-library/react';

import HouseStructureIndex from './house-structure-index';

describe('HouseStructureIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HouseStructureIndex />);
    expect(baseElement).toBeTruthy();
  });
});
