import { render } from '@testing-library/react';

import AddNewItem from './add-new-item';

describe('AddNewItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddNewItem />);
    expect(baseElement).toBeTruthy();
  });
});
