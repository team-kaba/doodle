import 'react-native';

import {render, waitFor} from '@testing-library/react-native';
import React from 'react';

import App from '@app/App';

describe('App.tsx', () => {
  it('renders correctly', async () => {
    const app = render(<App />);
    await waitFor(() => app.getByTestId(':screens/home'));
    expect(app.toJSON()).toMatchSnapshot();
  });
});
