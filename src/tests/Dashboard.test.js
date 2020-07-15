import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import db from '../data/db.json';

describe('Dashboard', () => {
  it('renders without fails', () => {
    render(<Dashboard data={db} />);
  });
});