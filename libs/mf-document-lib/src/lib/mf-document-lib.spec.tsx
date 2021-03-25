import React from 'react';
import { render } from '@testing-library/react';

import MfDocumentLib from './mf-document-lib';

describe('MfDocumentLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfDocumentLib />);
    expect(baseElement).toBeTruthy();
  });
});
