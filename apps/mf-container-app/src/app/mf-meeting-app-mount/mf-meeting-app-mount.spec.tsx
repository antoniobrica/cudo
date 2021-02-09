import React from 'react';
import { render } from '@testing-library/react';

import MfMeetingAppMount from './mf-meeting-app-mount';

describe('MfMeetingAppMount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MfMeetingAppMount />);
    expect(baseElement).toBeTruthy();
  });
});
