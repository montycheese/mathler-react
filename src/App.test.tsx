import React from 'react';
import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

import App from './App';

test('renders successfully', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<App/>)
});
